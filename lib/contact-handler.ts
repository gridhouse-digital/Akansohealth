import { z } from 'zod'
import { contactSchema, type ContactInput } from './contact'
import type { DeliveryResult } from './contact-delivery'
import type { RateLimitResult } from './rate-limit'
import type { TurnstileResult } from './turnstile'

export type ContactFailure =
  'invalid' | 'not_configured' | 'upstream' | 'rate_limited' | 'turnstile'

export type ContactHandleResult =
  | { ok: true }
  | {
      ok: false
      error: 'invalid'
      issues: Partial<Record<keyof ContactInput, string[]>>
    }
  | { ok: false; error: Exclude<ContactFailure, 'invalid'> }

export async function handleContact(options: {
  raw: Record<string, unknown>
  ip: string
  submissionId: string
  limit: { check: (key: string) => RateLimitResult }
  verify: (token: string | undefined, ip: string) => Promise<TurnstileResult>
  deliver: (data: ContactInput, submissionId: string) => Promise<DeliveryResult>
}): Promise<ContactHandleResult> {
  if (!options.limit.check(options.ip).ok) {
    return { ok: false, error: 'rate_limited' }
  }

  const raw = { ...options.raw }
  if (typeof raw.preferredTime !== 'string') raw.preferredTime = ''
  if (typeof raw.company !== 'string') raw.company = ''

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'invalid',
      issues: z.flattenError(parsed.error).fieldErrors,
    }
  }

  if (parsed.data.company.trim()) return { ok: true }

  const tokenValue = raw['cf-turnstile-response']
  const token = typeof tokenValue === 'string' ? tokenValue : undefined
  const verdict = await options.verify(token, options.ip)
  if (verdict === 'failed') {
    console.error('contact verification failed', {
      submissionId: options.submissionId,
      reason: 'turnstile',
    })
    return { ok: false, error: 'turnstile' }
  }

  const delivered = await options.deliver(parsed.data, options.submissionId)
  if (delivered === 'ok') return { ok: true }
  return { ok: false, error: delivered }
}
