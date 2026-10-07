import { z } from 'zod'
import { contactSchema, reasonLabel } from '@/lib/contact'
import { site } from '@/lib/site'

export async function POST(request: Request) {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT
  if (!endpoint) {
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 })
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
      { status: 422 },
    )
  }

  const { company, ...data } = parsed.data
  if (company) return Response.json({ ok: true })

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
        ...data,
        reason: reasonLabel(data.reason),
        _subject: `New inquiry — ${site.name}: ${reasonLabel(data.reason)}`,
        _replyto: data.email,
        _template: 'table',
        source: 'akansohhealthservices.com/contact',
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      return Response.json({ ok: false, error: 'upstream' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'upstream' }, { status: 502 })
  }
}
