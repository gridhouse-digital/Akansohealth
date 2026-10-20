import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'
import { contactEmailText } from './contact-email'
import { deliverContact } from './contact-delivery'
import { handleContact } from './contact-handler'
import { contactSchema, oneLine, type ContactInput } from './contact'
import { clientIp, createRateLimiter } from './rate-limit'
import { verifyTurnstile } from './turnstile'

const sample: ContactInput = {
  name: 'Jordan Hale',
  phone: '(215) 555-0148',
  email: 'jordan.hale@example.com',
  preferredTime: 'Weekday mornings',
  role: 'individual',
  company: '',
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
      company: 'Acme Bots',
    })
    assert.equal(parsed.success, true)
    if (!parsed.success) return
    assert.equal(parsed.data.preferredTime, '')
    assert.equal(parsed.data.company, 'Acme Bots')
  })
})

describe('contact email', () => {
  it('stays plain text and collapses injected line breaks', () => {
    const text = contactEmailText(
      {
        ...sample,
        name: 'Jordan\nBcc: evil@example.com',
        preferredTime: '',
      },
      'submission-1',
    )
    assert.match(text, /Name: Jordan Bcc: evil@example.com/)
    assert.match(text, /Preferred time to call: Not provided/)
    assert.match(text, /I am a: Individual \/ family member/)
    assert.equal(text.includes('http'), false)
    assert.equal(text.includes('<'), false)
    assert.equal(oneLine('a\r\nb'), 'a b')
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

  it('sends plain text to the default inbox and logs failures without personal data', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.CONTACT_FROM_EMAIL =
      'Akanso Health Website <website@send.akansohealth.com>'
    delete process.env.CONTACT_TO_EMAIL

    const sent: Array<{ to: string; replyTo: string; text: string; subject: string }> = []
    const ok = await deliverContact(sample, 'submission-3', async (args) => {
      sent.push(args)
      return { error: false }
    })
    assert.equal(ok, 'ok')
    assert.equal(sent[0]?.to, 'info@akansohealth.com')
    assert.equal(sent[0]?.replyTo, 'jordan.hale@example.com')
    assert.equal(sent[0]?.subject, 'Callback request — Akanso Health')
    assert.match(sent[0]?.text ?? '', /jordan\.hale@example\.com/)

    const logged: unknown[][] = []
    const original = console.error
    console.error = (...args: unknown[]) => {
      logged.push(args)
    }
    try {
      const failed = await deliverContact(sample, 'submission-4', async () => ({
        error: true,
      }))
      assert.equal(failed, 'upstream')
    } finally {
      console.error = original
    }
    assert.deepEqual(logged, [
      [
        'contact delivery failed',
        { submissionId: 'submission-4', reason: 'resend_rejected' },
      ],
    ])
    const blob = JSON.stringify(logged)
    assert.equal(blob.includes(sample.email), false)
    assert.equal(blob.includes(sample.name), false)
    assert.equal(blob.includes(sample.phone), false)
  })
})

describe('handleContact', () => {
  const passLimit = { check: () => ({ ok: true as const }) }
  const skipVerify = async () => 'skipped' as const

  it('accepts a honeypot fill without delivering', async () => {
    let delivered = false
    const result = await handleContact({
      raw: { ...sample, company: 'not-empty' },
      ip: '203.0.113.5',
      submissionId: 'submission-5',
      limit: passLimit,
      verify: skipVerify,
      deliver: async () => {
        delivered = true
        return 'ok'
      },
    })
    assert.deepEqual(result, { ok: true })
    assert.equal(delivered, false)
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
