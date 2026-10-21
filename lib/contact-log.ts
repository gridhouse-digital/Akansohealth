import type { ContactHandleResult } from './contact-handler'

export type ContactLogReason =
  | 'ok'
  | 'invalid'
  | 'not_configured'
  | 'rate_limited'
  | 'honeypot'
  | 'turnstile'
  | 'resend_failure'

export function contactLogReason(outcome: ContactHandleResult): ContactLogReason {
  if (outcome.ok) return outcome.honeypot ? 'honeypot' : 'ok'
  switch (outcome.error) {
    case 'invalid':
      return 'invalid'
    case 'not_configured':
      return 'not_configured'
    case 'rate_limited':
      return 'rate_limited'
    case 'turnstile':
      return 'turnstile'
    case 'upstream':
      return 'resend_failure'
    default: {
      const neverOutcome: never = outcome
      return neverOutcome
    }
  }
}

export function logContactOutcome(submissionId: string, reason: ContactLogReason) {
  const entry = { submissionId, reason }
  if (reason === 'ok') console.info('contact form', entry)
  else console.warn('contact form', entry)
}
