import { oneLine, roleLabel, type ContactInput } from './contact'

export const CONTACT_EMAIL_SUBJECT = 'Callback request — Akanso Health'

export const DEFAULT_CONTACT_TO_EMAIL = 'info@akansohealth.com'

export function contactEmailText(data: ContactInput, submissionId: string) {
  const preferredTime = oneLine(data.preferredTime)
  return [
    'Callback request from the Akanso Health website.',
    '',
    `Name: ${oneLine(data.name)}`,
    `Phone: ${oneLine(data.phone)}`,
    `Email: ${oneLine(data.email)}`,
    `I am a: ${roleLabel(data.role)}`,
    `Preferred time to call: ${preferredTime || 'Not provided'}`,
    '',
    `Submission: ${submissionId}`,
    'The form asks people not to include medical or diagnosis details.',
  ].join('\n')
}
