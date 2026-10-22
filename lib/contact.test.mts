import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'
import {
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
  contactSourcePage,
  formatReceivedAt,
} from './contact-email'
import {
  contactRecipients,
  deliverContact,
  type ContactSendArgs,
} from './contact-delivery'
import { handleContact } from './contact-handler'
import { contactSchema, honeypotTripped, oneLine, type ContactInput } from './contact'
import { contactLogReason, logContactOutcome } from './contact-log'
import { clientIp, createRateLimiter } from './rate-limit'
import { verifyTurnstile } from './turnstile'

const sample: ContactInput = {
  name: 'Jordan Hale',
  phone: '(215) 555-0148',
  email: 'jordan.hale@example.com',
  preferredTime: 'Weekday mornings',
  role: 'individual',
  hp_leave_blank: '',
}

const envKeys = [
  'RESEND_API_KEY',
  'CONTACT_FROM_EMAIL',
  'CONTACT_TO_EMAIL',
  'TURNSTILE_SECRET_KEY',
  'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
  'TURNSTILE_HOSTNAMES',
] as const

const savedEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]))

afterEach(() => {
  for (const key of envKeys) {
    const value = savedEnv[key]
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})

describe('contactSchema', () => {
  it('accepts a callback request and drops a free-text message', () => {
    const parsed = contactSchema.safeParse({
      ...sample,
      message: 'Diagnosis: please ignore this',
      reason: 'shift-nursing',
    })
    assert.equal(parsed.success, true)
    if (!parsed.success) return
    assert.equal(parsed.data.name, 'Jordan Hale')
    assert.equal(parsed.data.preferredTime, 'Weekday mornings')
    assert.equal('message' in parsed.data, false)
    assert.equal('reason' in parsed.data, false)
  })

  it('requires a role and a phone number', () => {
    const parsed = contactSchema.safeParse({ ...sample, role: '', phone: '' })
    assert.equal(parsed.success, false)
  })

  it('allows an empty preferred time and keeps the honeypot', () => {
    const parsed = contactSchema.safeParse({
      ...sample,
      preferredTime: '   ',
      hp_leave_blank: 'Acme Bots',
    })
    assert.equal(parsed.success, true)
    if (!parsed.success) return
    assert.equal(parsed.data.preferredTime, '')
    assert.equal(parsed.data.hp_leave_blank, 'Acme Bots')
  })

  it('ignores a honeypot that only repeats another answer', () => {
    assert.equal(honeypotTripped({ ...sample, hp_leave_blank: '' }), false)
    assert.equal(honeypotTripped({ ...sample, hp_leave_blank: 'Jordan Hale' }), false)
    assert.equal(
      honeypotTripped({ ...sample, hp_leave_blank: 'jordan.hale@example.com' }),
      false,
    )
    assert.equal(
      honeypotTripped({ ...sample, hp_leave_blank: 'https://spam.example' }),
      true,
    )
  })
})

describe('contact email', () => {
  const receivedAt = new Date('2026-10-22T19:17:00.000Z')

  it('stays plain text and collapses injected line breaks', () => {
    const text = contactEmailText(
      {
        ...sample,
        name: 'Jordan\nBcc: evil@example.com',
        preferredTime: '',
      },
      'submission-1',
      { receivedAt },
    )
    assert.match(text, /Name: Jordan Bcc: evil@example.com/)
    assert.match(text, /Preferred time to call: Not provided/)
    assert.match(text, /I am a: Individual \/ family member/)
    assert.match(text, /Received: Thu, Oct 22, 2026, 3:17 PM EDT/)
    assert.match(text, /Source: https:\/\/akansohealth\.com\/contact/)
    assert.deepEqual(text.match(/https?:\/\/\S+/g), ['https://akansohealth.com/contact'])
    assert.equal(text.includes('<'), false)
    assert.equal(text.includes('\nBcc:'), false)
    assert.equal(oneLine('a\r\nb'), 'a b')
  })

  it('puts the person in the subject and formats New York time', () => {
    assert.equal(
      contactEmailSubject('Jordan\r\nBcc: evil@example.com'),
      'New callback request: Jordan Bcc: evil@example.com',
    )
    assert.equal(formatReceivedAt(receivedAt), 'Thu, Oct 22, 2026, 3:17 PM EDT')
    assert.equal(
      formatReceivedAt(new Date('2026-01-15T15:00:00.000Z')),
      'Thu, Jan 15, 2026, 10:00 AM EST',
    )
  })

  it('escapes user input and links phone and email', () => {
    const html = contactEmailHtml(
      {
        ...sample,
        name: `Jordan <script>alert(1)</script> & "Sam"`,
        phone: '(215) 555-0198',
        email: 'jordan.sample@example.com',
        preferredTime: '',
      },
      'sub <id>',
      {
        receivedAt,
        message: 'Line one\n<script>nope</script>',
      },
    )
    assert.equal(html.includes('<script>'), false)
    assert.match(
      html,
      /Jordan &lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; &quot;Sam&quot;/,
    )
    assert.match(html, /Line one<br>&lt;script&gt;nope&lt;\/script&gt;/)
    assert.match(html, /href="tel:\+12155550198"/)
    assert.match(html, /href="mailto:jordan\.sample@example\.com"/)
    assert.match(html, />Call back</)
    assert.match(html, />Reply by email</)
    assert.match(html, /color:#6b635a;[^"]*"[^>]*>\s*Not provided/)
    assert.match(html, /https:\/\/akansohealth\.com\/brand\/akansoh-lockup\.png/)
    assert.match(html, /Submission/)
    assert.match(html, /sub &lt;id&gt;/)
    assert.match(
      html,
      /The form asks people not to include medical or diagnosis details\./,
    )
  })

  it('omits the message row when there is no message', () => {
    const html = contactEmailHtml(
      { ...sample, preferredTime: 'Weekday mornings' },
      'submission-1',
      { receivedAt },
    )
    assert.equal(html.includes('Message'), false)
    assert.equal(html.includes('#6b635a'), false)
    assert.match(html, /Weekday mornings/)
  })

  it('keeps the source on the contact page', () => {
    assert.equal(
      contactSourcePage('https://akanso-preview.vercel.app/api/contact'),
      'https://akanso-preview.vercel.app/contact',
    )
    assert.equal(
      contactSourcePage('https://akansohealth.com/api/contact?x=1'),
      'https://akansohealth.com/contact',
    )
    assert.equal(
      contactSourcePage('https://evil.example/api/contact'),
      'https://akansohealth.com/contact',
    )
    const html = contactEmailHtml(sample, 'submission-1', {
      receivedAt,
      sourcePage: 'javascript:alert(1)',
    })
    assert.equal(html.includes('javascript:'), false)
    assert.match(html, /href="https:\/\/akansohealth\.com\/contact"/)
  })

  it('does not turn a junk phone or email into a link', () => {
    const html = contactEmailHtml(
      {
        ...sample,
        name: '"><img src=x onerror=alert(1)>',
        phone: 'javascript:alert(1)',
        email: 'not-an-email',
      },
      'submission-1',
      { receivedAt },
    )
    assert.deepEqual(html.match(/<img/g), ['<img'])
    assert.match(
      html,
      /<img src="https:\/\/akansohealth\.com\/brand\/akansoh-lockup\.png"/,
    )
    assert.equal(html.includes('href="javascript:'), false)
    assert.equal(html.includes('href="tel:'), false)
    assert.equal(html.includes('mailto:'), false)
    assert.match(html, /&quot;&gt;&lt;img src=x onerror=alert\(1\)&gt;/)
  })
})

describe('rate limit', () => {
  it('blocks an IP inside the window and allows it again after', () => {
    let now = 1_000
    const limiter = createRateLimiter({ limit: 2, windowMs: 1_000, now: () => now })
    assert.equal(limiter.check('203.0.113.5').ok, true)
    assert.equal(limiter.check('203.0.113.5').ok, true)
    const blocked = limiter.check('203.0.113.5')
    assert.equal(blocked.ok, false)
    if (!blocked.ok) assert.ok(blocked.retryAfterSeconds >= 1)
    assert.equal(limiter.check('203.0.113.9').ok, true)
    now += 1_000
    assert.equal(limiter.check('203.0.113.5').ok, true)
  })

  it('reads the platform client IP', () => {
    const request = new Request('https://akansohealth.com/api/contact', {
      headers: {
        'x-real-ip': '203.0.113.8',
        'x-forwarded-for': '198.51.100.4, 203.0.113.8',
      },
    })
    assert.equal(clientIp(request), '203.0.113.8')
    const forwardedOnly = new Request('https://akansohealth.com/api/contact', {
      headers: { 'x-forwarded-for': '198.51.100.4, 203.0.113.8' },
    })
    assert.equal(clientIp(forwardedOnly), '198.51.100.4')
  })
})

describe('turnstile', () => {
  it('skips verification when either key is missing', async () => {
    delete process.env.TURNSTILE_SECRET_KEY
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    const result = await verifyTurnstile({
      token: undefined,
      fetchImpl: async () => {
        throw new Error('should not call siteverify')
      },
    })
    assert.equal(result, 'skipped')
  })

  it('accepts a matching action and rejects the wrong one', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site'
    delete process.env.TURNSTILE_HOSTNAMES

    const ok = await verifyTurnstile({
      token: 'token-ok',
      remoteIp: '203.0.113.5',
      fetchImpl: async () =>
        Response.json({ success: true, action: 'contact', hostname: 'akansohealth.com' }),
    })
    assert.equal(ok, 'ok')

    const wrongAction = await verifyTurnstile({
      token: 'token-ok',
      fetchImpl: async () => Response.json({ success: true, action: 'signup' }),
    })
    assert.equal(wrongAction, 'failed')
  })

  it('checks hostnames only when TURNSTILE_HOSTNAMES is set', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site'
    process.env.TURNSTILE_HOSTNAMES = 'akansohealth.com, www.akansohealth.com'

    const fetchImpl: typeof fetch = async () =>
      Response.json({ success: true, action: 'contact', hostname: 'preview.example' })
    assert.equal(await verifyTurnstile({ token: 'token-ok', fetchImpl }), 'failed')
  })
})

describe('delivery', () => {
  it('does not send when Resend is not configured', async () => {
    delete process.env.RESEND_API_KEY
    delete process.env.CONTACT_FROM_EMAIL
    let called = false
    const result = await deliverContact(sample, 'submission-2', async () => {
      called = true
      return { error: false }
    })
    assert.equal(result, 'not_configured')
    assert.equal(called, false)
  })

  it('sends html and plain text to the default inbox and logs failures without personal data', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.CONTACT_FROM_EMAIL =
      'Akanso Health Website <website@send.akansohealth.com>'
    delete process.env.CONTACT_TO_EMAIL

    const sent: ContactSendArgs[] = []
    const ok = await deliverContact(sample, 'submission-3', async (args) => {
      sent.push(args)
      return { error: false }
    })
    assert.equal(ok, 'ok')
    assert.deepEqual(sent[0]?.to, ['info@akansohealth.com'])
    assert.equal(sent[0]?.from, 'Akanso Health Website <website@send.akansohealth.com>')
    assert.equal(sent[0]?.replyTo, 'jordan.hale@example.com')
    assert.equal(sent[0]?.subject, 'New callback request: Jordan Hale')
    assert.match(sent[0]?.text ?? '', /jordan\.hale@example\.com/)
    assert.match(sent[0]?.html ?? '', /mailto:jordan\.hale@example\.com/)
    assert.match(sent[0]?.html ?? '', /Call back/)

    const failed = await deliverContact(sample, 'submission-4', async () => ({
      error: true,
    }))
    assert.equal(failed, 'upstream')
    assert.equal(contactLogReason({ ok: false, error: 'upstream' }), 'resend_failure')
  })
})

describe('contact recipients', () => {
  it('keeps a single address', () => {
    assert.deepEqual(contactRecipients('info@akansohealth.com'), [
      'info@akansohealth.com',
    ])
  })

  it('splits commas and semicolons', () => {
    assert.deepEqual(
      contactRecipients(
        'intake@akansohealth.com, info@akansohealth.com; desk@akansohealth.com',
      ),
      ['intake@akansohealth.com', 'info@akansohealth.com', 'desk@akansohealth.com'],
    )
  })

  it('trims spaces and drops empty pieces', () => {
    assert.deepEqual(
      contactRecipients('  intake@akansohealth.com , , info@akansohealth.com  '),
      ['intake@akansohealth.com', 'info@akansohealth.com'],
    )
  })

  it('ignores invalid addresses and duplicates', () => {
    assert.deepEqual(
      contactRecipients(
        'not-an-email, info@akansohealth.com, info@akansohealth.com, also-bad',
      ),
      ['info@akansohealth.com'],
    )
  })

  it('falls back when none remain', () => {
    assert.deepEqual(contactRecipients(undefined), ['info@akansohealth.com'])
    assert.deepEqual(contactRecipients(''), ['info@akansohealth.com'])
    assert.deepEqual(contactRecipients(' , ; not-an-email '), ['info@akansohealth.com'])
  })

  it('caps the list at 50', () => {
    const addresses = Array.from({ length: 51 }, (_, index) => `n${index}@example.com`)
    const parsed = contactRecipients(addresses.join(';'))
    assert.equal(parsed.length, 50)
    assert.equal(parsed[0], 'n0@example.com')
    assert.equal(parsed[49], 'n49@example.com')
  })
})

describe('contact logs', () => {
  it('logs a submission id and reason, and nothing personal', () => {
    const logged: unknown[][] = []
    const originalInfo = console.info
    const originalWarn = console.warn
    console.info = (...args: unknown[]) => {
      logged.push(args)
    }
    console.warn = (...args: unknown[]) => {
      logged.push(args)
    }
    try {
      logContactOutcome('submission-4', 'ok')
      logContactOutcome('submission-4', 'resend_failure')
      logContactOutcome('submission-5', 'honeypot')
      logContactOutcome('submission-6', 'invalid')
    } finally {
      console.info = originalInfo
      console.warn = originalWarn
    }
    assert.deepEqual(logged, [
      ['contact form', { submissionId: 'submission-4', reason: 'ok' }],
      ['contact form', { submissionId: 'submission-4', reason: 'resend_failure' }],
      ['contact form', { submissionId: 'submission-5', reason: 'honeypot' }],
      ['contact form', { submissionId: 'submission-6', reason: 'invalid' }],
    ])
    const blob = JSON.stringify(logged)
    assert.equal(blob.includes(sample.email), false)
    assert.equal(blob.includes(sample.name), false)
    assert.equal(blob.includes(sample.phone), false)
    assert.equal(contactLogReason({ ok: true, honeypot: false }), 'ok')
    assert.equal(contactLogReason({ ok: true, honeypot: true }), 'honeypot')
    assert.equal(contactLogReason({ ok: false, error: 'rate_limited' }), 'rate_limited')
    assert.equal(
      contactLogReason({ ok: false, error: 'not_configured' }),
      'not_configured',
    )
    assert.equal(contactLogReason({ ok: false, error: 'turnstile' }), 'turnstile')
  })
})

describe('handleContact', () => {
  const passLimit = { check: () => ({ ok: true as const }) }
  const skipVerify = async () => 'skipped' as const

  it('accepts a honeypot fill without delivering', async () => {
    let delivered = false
    const result = await handleContact({
      raw: { ...sample, hp_leave_blank: 'https://spam.example' },
      ip: '203.0.113.5',
      submissionId: 'submission-5',
      limit: passLimit,
      verify: skipVerify,
      deliver: async () => {
        delivered = true
        return 'ok'
      },
    })
    assert.deepEqual(result, { ok: true, honeypot: true })
    assert.equal(delivered, false)
  })

  it('still delivers when the honeypot repeats the name', async () => {
    let delivered = false
    const result = await handleContact({
      raw: { ...sample, hp_leave_blank: sample.name },
      ip: '203.0.113.5',
      submissionId: 'submission-7',
      limit: passLimit,
      verify: skipVerify,
      deliver: async () => {
        delivered = true
        return 'ok'
      },
    })
    assert.deepEqual(result, { ok: true, honeypot: false })
    assert.equal(delivered, true)
  })

  it('stops when the rate limit says no', async () => {
    const result = await handleContact({
      raw: sample,
      ip: '203.0.113.5',
      submissionId: 'submission-6',
      limit: { check: () => ({ ok: false, retryAfterSeconds: 30 }) },
      verify: skipVerify,
      deliver: async () => 'ok',
    })
    assert.deepEqual(result, { ok: false, error: 'rate_limited' })
  })
})
