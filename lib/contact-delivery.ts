import { Resend } from 'resend'
import { oneLine, type ContactInput } from './contact'
import {
  CONTACT_EMAIL_SUBJECT,
  DEFAULT_CONTACT_TO_EMAIL,
  contactEmailText,
} from './contact-email'

export type DeliveryResult = 'ok' | 'not_configured' | 'upstream'

export type ContactSendArgs = {
  apiKey: string
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
  submissionId: string
}

export function contactDeliveryConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? ''
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? ''
  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_TO_EMAIL
  return { apiKey, from, to, configured: Boolean(apiKey && from && to) }
}

async function sendWithResend(args: ContactSendArgs): Promise<{ error: boolean }> {
  const resend = new Resend(args.apiKey)
  const { error } = await resend.emails.send(
    {
      from: args.from,
      to: [args.to],
      replyTo: args.replyTo,
      subject: args.subject,
      text: args.text,
    },
    { idempotencyKey: `contact/${args.submissionId}` },
  )
  return { error: Boolean(error) }
}

export async function deliverContact(
  data: ContactInput,
  submissionId: string,
  send: (args: ContactSendArgs) => Promise<{ error: boolean }> = sendWithResend,
): Promise<DeliveryResult> {
  const config = contactDeliveryConfig()
  if (!config.configured) return 'not_configured'

  try {
    const { error } = await send({
      apiKey: config.apiKey,
      from: config.from,
      to: config.to,
      replyTo: oneLine(data.email),
      subject: CONTACT_EMAIL_SUBJECT,
      text: contactEmailText(data, submissionId),
      submissionId,
    })
    if (error) {
      console.error('contact delivery failed', {
        submissionId,
        reason: 'resend_rejected',
      })
      return 'upstream'
    }
    return 'ok'
  } catch {
    console.error('contact delivery failed', {
      submissionId,
      reason: 'resend_exception',
    })
    return 'upstream'
  }
}
