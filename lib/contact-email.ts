import { roleLabel, type ContactInput } from './contact'
import { site, siteUrl } from './site'

const LOGO_URL = 'https://akansohealth.com/brand/akansoh-lockup.png'
const SANS = "'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
const SERIF = "Georgia,'Times New Roman',Times,serif"
const MUTED = '#6b635a'

export const DEFAULT_CONTACT_TO_EMAIL = 'info@akansohealth.com'

const MEDICAL_NOTE = 'The form asks people not to include medical or diagnosis details.'

export type ContactEmailOptions = {
  receivedAt?: Date
  sourcePage?: string
  message?: string
}

type Field = {
  label: string
  value: string
  href?: string
  muted?: boolean
  emphasize?: boolean
}

type ResolvedEmail = {
  subject: string
  submissionId: string
  receivedLabel: string
  sourcePage: string
  sourceHref: string
  message: string
  fields: Field[]
  phoneHref: string
  emailHref: string
}

export function contactSourcePage(requestUrl: string) {
  const fallback = `${siteUrl}/contact`
  try {
    const request = new URL(requestUrl)
    const page = new URL('/contact', request)
    if (page.protocol !== 'https:' && page.protocol !== 'http:') return fallback
    if (!allowedSourceHost(page.host)) return fallback
    return page.href
  } catch {
    return fallback
  }
}

function allowedSourceHost(host: string) {
  let siteHost = ''
  try {
    siteHost = new URL(siteUrl).host
  } catch {
    siteHost = ''
  }
  if (host === siteHost) return true
  if (host === 'akansohealth.com' || host === 'www.akansohealth.com') return true
  return host.endsWith('.vercel.app')
}

export function contactEmailSubject(name: string) {
  return `New callback request: ${singleLine(name)}`
}

export function formatReceivedAt(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h12',
    timeZoneName: 'short',
  }).formatToParts(date)
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ''
  return `${pick('weekday')}, ${pick('month')} ${pick('day')}, ${pick('year')}, ${pick('hour')}:${pick('minute')} ${pick('dayPeriod')} ${pick('timeZoneName')}`
}

export function contactEmailText(
  data: ContactInput,
  submissionId: string,
  options?: ContactEmailOptions,
) {
  const email = resolveEmail(data, submissionId, options)
  const lines = [
    email.subject,
    site.name,
    '',
    ...email.fields.map((field) => `${field.label}: ${field.value}`),
    '',
  ]
  if (email.phoneHref) lines.push(`Call back: ${email.phoneHref}`)
  if (email.emailHref) lines.push(`Reply by email: ${email.emailHref}`)
  lines.push(
    '',
    `Submission: ${email.submissionId}`,
    `Received: ${email.receivedLabel}`,
    `Source: ${email.sourcePage}`,
    '',
    MEDICAL_NOTE,
  )
  return lines.join('\n')
}

export function contactEmailHtml(
  data: ContactInput,
  submissionId: string,
  options?: ContactEmailOptions,
) {
  const email = resolveEmail(data, submissionId, options)
  const preheader = `${singleLine(data.name)} asked for a callback. Phone ${singleLine(data.phone)}.`
  const rows = email.fields.map(fieldRow).join('')
  const actions = buttonPair(email.phoneHref, email.emailHref)
  const source = email.sourceHref
    ? link(email.sourceHref, email.sourcePage)
    : escapeHtml(email.sourcePage)

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
<title>${escapeHtml(email.subject)}</title>
<!--[if mso]>
<xml>
  <o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
  @media only screen and (max-width: 480px) {
    .email-container { width: 100% !important; }
    .pad { padding-left: 20px !important; padding-right: 20px !important; }
    .stack { display: block !important; width: 100% !important; }
    .stack-pad { padding-right: 0 !important; padding-bottom: 10px !important; }
    .stack-gap { padding-left: 0 !important; }
    .label, .value { display: block !important; width: 100% !important; box-sizing: border-box !important; }
    .label { padding: 12px 0 2px !important; }
    .value { padding: 0 0 12px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#f3ebdf;width:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f3ebdf;opacity:0;">${escapeHtml(preheader)}&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3ebdf" style="background-color:#f3ebdf;margin:0;padding:0;width:100%;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e5dccd;">
        <tr>
          <td height="4" bgcolor="#c5964e" style="height:4px;background-color:#c5964e;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td class="pad" bgcolor="#fbf7f1" style="padding:28px 32px 24px;background-color:#fbf7f1;">
            <a href="https://akansohealth.com" style="text-decoration:none;">
              <img src="${LOGO_URL}" width="280" height="68" alt="Akansoh Health Services" style="display:block;width:280px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;">
            </a>
            <p style="margin:18px 0 0;font-family:${SANS};font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#87601f;">Staff notification</p>
            <p style="margin:8px 0 0;font-family:${SERIF};font-size:28px;line-height:34px;color:#142a22;">New callback request</p>
            <p style="margin:8px 0 0;font-family:${SANS};font-size:15px;line-height:22px;color:#4a5a51;">Someone on the website asked for a call back. Reply goes to them.</p>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:8px 32px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
              ${rows}
            </table>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:20px 32px 28px;">
            ${actions}
          </td>
        </tr>
        <tr>
          <td class="pad" bgcolor="#f7f1e8" style="padding:20px 32px 22px;background-color:#f7f1e8;border-top:1px solid #e5dccd;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
              ${metaRow('Submission', escapeHtml(email.submissionId))}
              ${metaRow('Received', escapeHtml(email.receivedLabel))}
              ${metaRow('Source', source)}
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:16px;border-collapse:collapse;">
              <tr>
                <td width="3" bgcolor="#c5964e" style="width:3px;background-color:#c5964e;font-size:0;line-height:0;">&nbsp;</td>
                <td bgcolor="#fbf7f1" style="padding:10px 12px;background-color:#fbf7f1;font-family:${SANS};font-size:13px;line-height:20px;color:#4a5a51;">${escapeHtml(MEDICAL_NOTE)}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="pad" bgcolor="#0f2e25" style="padding:16px 32px;background-color:#0f2e25;">
            <p style="margin:0;font-family:${SANS};font-size:13px;line-height:18px;color:#f4efe6;">${escapeHtml(site.name)} · ${escapeHtml(site.address.city)}, ${escapeHtml(site.address.region)}</p>
            <p style="margin:4px 0 0;font-family:${SANS};font-size:12px;line-height:18px;color:#c5964e;">${escapeHtml(site.tagline)}</p>
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`
}

export function buildContactEmail(
  data: ContactInput,
  submissionId: string,
  options?: ContactEmailOptions,
) {
  return {
    subject: contactEmailSubject(data.name),
    text: contactEmailText(data, submissionId, options),
    html: contactEmailHtml(data, submissionId, options),
  }
}

function resolveEmail(
  data: ContactInput,
  submissionId: string,
  options: ContactEmailOptions = {},
): ResolvedEmail {
  const receivedAt = options.receivedAt ?? new Date()
  const source = resolveSource(options.sourcePage)
  const message = cleanMessage(options.message)
  const phone = singleLine(data.phone)
  const email = singleLine(data.email)
  const preferred = singleLine(data.preferredTime)
  const phoneLink = phoneHref(phone)
  const emailLink = emailHref(email)
  const fields: Field[] = [
    { label: 'Name', value: singleLine(data.name), emphasize: true },
    { label: 'Phone', value: phone, href: phoneLink },
    { label: 'Email', value: email, href: emailLink },
    { label: 'I am a', value: singleLine(roleLabel(data.role)) },
    {
      label: 'Preferred time to call',
      value: preferred || 'Not provided',
      muted: !preferred,
    },
  ]
  if (message) fields.push({ label: 'Message', value: message })
  return {
    subject: contactEmailSubject(data.name),
    submissionId: singleLine(submissionId),
    receivedLabel: formatReceivedAt(receivedAt),
    sourcePage: source.label,
    sourceHref: source.href,
    message,
    fields,
    phoneHref: phoneLink,
    emailHref: emailLink,
  }
}

function resolveSource(sourcePage: string | undefined) {
  const fallback = `${siteUrl}/contact`
  if (!sourcePage) return { label: fallback, href: fallback }
  try {
    const url = new URL(sourcePage)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return { label: fallback, href: fallback }
    }
    return { label: url.href, href: url.href }
  } catch {
    return { label: fallback, href: fallback }
  }
}

function fieldRow(field: Field) {
  const color = field.muted ? MUTED : '#142a22'
  const weight = field.emphasize ? '700' : '400'
  const value =
    field.label === 'Message'
      ? multiline(field.value)
      : field.href
        ? link(field.href, field.value)
        : escapeHtml(field.value)
  return `<tr>
<td class="label" width="200" valign="top" style="width:200px;padding:14px 16px 14px 0;border-bottom:1px solid #e5dccd;font-family:${SANS};font-size:14px;line-height:22px;font-weight:700;color:#4a5a51;">${escapeHtml(field.label)}</td>
<td class="value" valign="top" style="padding:14px 0;border-bottom:1px solid #e5dccd;font-family:${SANS};font-size:16px;line-height:24px;font-weight:${weight};color:${color};overflow-wrap:anywhere;word-break:break-word;">${value}</td>
</tr>`
}

function metaRow(label: string, valueHtml: string) {
  return `<tr>
<td width="110" valign="top" style="width:110px;padding:3px 12px 3px 0;font-family:${SANS};font-size:12px;line-height:18px;font-weight:700;color:#87601f;">${escapeHtml(label)}</td>
<td valign="top" style="padding:3px 0;font-family:${SANS};font-size:12px;line-height:18px;color:#142a22;overflow-wrap:anywhere;word-break:break-word;">${valueHtml}</td>
</tr>`
}

type ButtonVariant = 'primary' | 'secondary'

function buttonPair(phoneLink: string, emailLink: string) {
  const items = [
    phoneLink
      ? { label: 'Call back', href: phoneLink, variant: 'primary' as const }
      : null,
    emailLink
      ? { label: 'Reply by email', href: emailLink, variant: 'secondary' as const }
      : null,
  ].filter((item) => item !== null)
  if (items.length === 0) return ''
  if (items.length === 1) {
    const only = items[0]
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td>${button(only.label, only.href, only.variant)}</td></tr></table>`
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="stack stack-pad" width="50%" valign="top" style="width:50%;padding-right:8px;">${button(items[0].label, items[0].href, items[0].variant)}</td>
<td class="stack stack-gap" width="50%" valign="top" style="width:50%;padding-left:8px;">${button(items[1].label, items[1].href, items[1].variant)}</td>
</tr></table>`
}

function button(label: string, href: string, variant: ButtonVariant) {
  const tone = buttonTone(variant)
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td align="center" bgcolor="${tone.bg}" style="background-color:${tone.bg};border-radius:8px;border:1px solid ${tone.border};">
<a href="${escapeHtml(href)}" style="display:block;padding:14px 12px;font-family:${SANS};font-size:15px;line-height:20px;font-weight:700;color:${tone.color};text-decoration:none;border-radius:8px;">${escapeHtml(label)}</a>
</td>
</tr></table>`
}

function buttonTone(variant: ButtonVariant) {
  switch (variant) {
    case 'primary':
      return { bg: '#1b4b3b', color: '#ffffff', border: '#1b4b3b' }
    case 'secondary':
      return { bg: '#ffffff', color: '#1b4b3b', border: '#1b4b3b' }
    default: {
      const neverVariant: never = variant
      return neverVariant
    }
  }
}

function link(href: string, label: string) {
  return `<a href="${escapeHtml(href)}" style="color:#1b4b3b;text-decoration:underline;">${escapeHtml(label)}</a>`
}

function phoneHref(phone: string) {
  const hasPlus = phone.trim().startsWith('+')
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7) return ''
  if (hasPlus) return `tel:+${digits}`
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`
  return `tel:${digits}`
}

function emailHref(email: string) {
  if (!/^[^\s<>"'`]+@[^\s<>"'`]+\.[^\s<>"'`]+$/.test(email)) return ''
  return `mailto:${email}`
}

function singleLine(value: string) {
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanMessage(message: string | undefined) {
  if (!message) return ''
  return message
    .replace(/\u0000/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
}

function multiline(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br>')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
