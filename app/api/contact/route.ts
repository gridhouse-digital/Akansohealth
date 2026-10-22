import { deliverContactFromRequest } from '@/lib/contact-delivery'
import { handleContact, type ContactHandleResult } from '@/lib/contact-handler'
import { contactLogReason, logContactOutcome } from '@/lib/contact-log'
import { clientIp, contactRateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

function statusFor(
  error: 'not_configured' | 'upstream' | 'rate_limited' | 'turnstile',
): number {
  switch (error) {
    case 'not_configured':
      return 503
    case 'upstream':
      return 502
    case 'rate_limited':
      return 429
    case 'turnstile':
      return 403
    default: {
      const neverError: never = error
      return neverError
    }
  }
}

function redirectTo(request: Request, path: string) {
  return Response.redirect(new URL(path, request.url), 303)
}

function logOutcome(submissionId: string, outcome: ContactHandleResult) {
  logContactOutcome(submissionId, contactLogReason(outcome))
}

async function formRecord(request: Request) {
  const form = await request.formData()
  const raw: Record<string, unknown> = {}
  for (const [key, value] of form.entries()) {
    if (typeof value === 'string') raw[key] = value
  }
  return raw
}

export async function POST(request: Request) {
  const submissionId = crypto.randomUUID()
  const type = request.headers.get('content-type') ?? ''
  const isForm =
    type.includes('application/x-www-form-urlencoded') ||
    type.includes('multipart/form-data')

  let raw: Record<string, unknown>
  if (isForm) {
    try {
      raw = await formRecord(request)
    } catch {
      logContactOutcome(submissionId, 'invalid')
      return redirectTo(request, '/contact/not-sent')
    }
  } else {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      logContactOutcome(submissionId, 'invalid')
      return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      logContactOutcome(submissionId, 'invalid')
      return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
    }
    raw = body as Record<string, unknown>
  }

  const outcome = await handleContact({
    raw,
    ip: clientIp(request),
    submissionId,
    limit: contactRateLimit,
    verify: (token, remoteIp) => verifyTurnstile({ token, remoteIp }),
    deliver: deliverContactFromRequest(request),
  })
  logOutcome(submissionId, outcome)

  if (isForm) {
    return redirectTo(request, outcome.ok ? '/contact/sent' : '/contact/not-sent')
  }

  if (outcome.ok) return Response.json({ ok: true })

  if (outcome.error === 'invalid') {
    return Response.json(
      { ok: false, error: 'invalid', issues: outcome.issues },
      { status: 422 },
    )
  }

  const headers = new Headers()
  if (outcome.error === 'rate_limited') headers.set('Retry-After', '600')
  return Response.json(
    { ok: false, error: outcome.error },
    { status: statusFor(outcome.error), headers },
  )
}
