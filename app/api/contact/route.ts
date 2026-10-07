import { z } from 'zod'
import { contactSchema, reasonLabel, type ContactInput } from '@/lib/contact'
import { site, siteUrl } from '@/lib/site'

type Result = 'ok' | 'invalid' | 'not_configured' | 'upstream'

const statusFor: Record<Exclude<Result, 'ok'>, number> = {
  invalid: 422,
  not_configured: 503,
  upstream: 502,
}

async function deliver(data: ContactInput): Promise<Result> {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT
  if (!endpoint) return 'not_configured'

  const { company, ...fields } = data
  if (company) return 'ok'

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = process.env.CONTACT_FORM_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...fields,
        reason: reasonLabel(fields.reason),
        _subject: `New inquiry — ${site.name}: ${reasonLabel(fields.reason)}`,
        _replyto: fields.email,
        _template: 'table',
        source: `${siteUrl}/contact`,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    return res.ok ? 'ok' : 'upstream'
  } catch {
    return 'upstream'
  }
}

function redirectTo(request: Request, path: string) {
  return Response.redirect(new URL(path, request.url), 303)
}

export async function POST(request: Request) {
  const type = request.headers.get('content-type') ?? ''
  const isForm =
    type.includes('application/x-www-form-urlencoded') ||
    type.includes('multipart/form-data')

  if (isForm) {
    let raw: Record<string, FormDataEntryValue>
    try {
      raw = { phone: '', company: '', ...Object.fromEntries(await request.formData()) }
    } catch {
      return redirectTo(request, '/contact/not-sent')
    }
    const parsed = contactSchema.safeParse(raw)
    if (!parsed.success) return redirectTo(request, '/contact/not-sent')
    const result = await deliver(parsed.data)
    return redirectTo(request, result === 'ok' ? '/contact/sent' : '/contact/not-sent')
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'invalid', issues: z.flattenError(parsed.error).fieldErrors },
      { status: statusFor.invalid },
    )
  }

  const result = await deliver(parsed.data)
  if (result === 'ok') return Response.json({ ok: true })
  return Response.json({ ok: false, error: result }, { status: statusFor[result] })
}
