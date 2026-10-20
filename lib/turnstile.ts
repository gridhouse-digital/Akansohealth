import { TURNSTILE_ACTION } from './contact'

export type TurnstileResult = 'skipped' | 'ok' | 'failed'

type SiteverifyResponse = {
  success?: boolean
  action?: string
  hostname?: string
}

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export function turnstileEnabled() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? ''
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() ?? ''
  return Boolean(siteKey && secret)
}

function allowedHostnames() {
  return (process.env.TURNSTILE_HOSTNAMES ?? '')
    .split(',')
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean)
}

export async function verifyTurnstile(options: {
  token: string | undefined
  remoteIp?: string
  fetchImpl?: typeof fetch
}): Promise<TurnstileResult> {
  if (!turnstileEnabled()) return 'skipped'

  const token = options.token?.trim() ?? ''
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() ?? ''
  if (!token || !secret) return 'failed'

  const body = new URLSearchParams({ secret, response: token })
  if (options.remoteIp && options.remoteIp !== 'unknown') {
    body.set('remoteip', options.remoteIp)
  }

  const fetchImpl = options.fetchImpl ?? fetch
  let response: Response
  try {
    response = await fetchImpl(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(10_000),
    })
  } catch {
    return 'failed'
  }

  let result: SiteverifyResponse
  try {
    result = (await response.json()) as SiteverifyResponse
  } catch {
    return 'failed'
  }

  if (!response.ok || result.success !== true || result.action !== TURNSTILE_ACTION) {
    return 'failed'
  }

  const allow = allowedHostnames()
  if (allow.length > 0 && !allow.includes((result.hostname ?? '').toLowerCase())) {
    return 'failed'
  }

  return 'ok'
}
