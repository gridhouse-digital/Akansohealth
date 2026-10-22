import { Resend } from 'resend'
import { oneLine, type ContactInput } from './contact'
import {
  buildContactEmail,
  contactSourcePage,
  DEFAULT_CONTACT_TO_EMAIL,
  type ContactEmailOptions,
} from './contact-email'

export type DeliveryResult = 'ok' | 'not_configured' | 'upstream'

export type ContactDeliveryDetails = ContactEmailOptions

export type ContactSendArgs = {
  apiKey: string
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
  html: string
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
      html: args.html,
    },
    { idempotencyKey: `contact/${args.submissionId}` },
  )
  return { error: Boolean(error) }
}

export function deliverContactFromRequest(request: Request) {
  const sourcePage = contactSourcePage(request.url)
  return (data: ContactInput, submissionId: string) =>
    deliverContact(data, submissionId, sendWithResend, { sourcePage })
}

export async function deliverContact(
  data: ContactInput,
  submissionId: string,
  send: (args: ContactSendArgs) => Promise<{ error: boolean }> = sendWithResend,
  details: ContactDeliveryDetails = {},
): Promise<DeliveryResult> {
  const config = contactDeliveryConfig()
  if (!config.configured) return 'not_configured'

  const receivedAt = details.receivedAt ?? new Date()
  const message = buildContactEmail(data, submissionId, { ...details, receivedAt })

  try {
    const { error } = await send({
      apiKey: config.apiKey,
      from: config.from,
      to: config.to,
      replyTo: oneLine(data.email),
      subject: message.subject,
      text: message.text,
      html: message.html,
      submissionId,
    })
    if (error) return 'upstream'
    return 'ok'
  } catch {
    return 'upstream'
  }
}
