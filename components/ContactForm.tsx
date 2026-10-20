'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, LoaderCircle, Mail, Phone, Send } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { useForm, type FieldError } from 'react-hook-form'
import { TurnstileWidget } from '@/components/TurnstileWidget'
import {
  contactRoles,
  contactSchema,
  roleLabel,
  type ContactInput,
  type ContactRole,
} from '@/lib/contact'
import { primaryEmail, primaryPhone, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { SubmitButton } from './Button'

type Status = 'idle' | 'success' | 'fallback' | 'unconfigured' | 'limited'

const subscribe = () => () => {}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? ''

const inputClass =
  'block w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 transition-[border-color,box-shadow] outline-none focus:border-brand focus:ring-3 focus:ring-brand/15 aria-invalid:border-danger aria-invalid:focus:ring-danger/15'

const selectClass = cn(
  inputClass,
  'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%231b4b3b%27 stroke-width=%272%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11',
)

const fallbackCopy = {
  fallback: {
    title: 'We couldn’t send your request just now.',
    body: 'Your details are ready to go. Open your email app with them filled in, or call us directly.',
  },
  unconfigured: {
    title: 'Almost there — send your request by email or phone.',
    body: 'Your details are ready to go. Open your email app with them filled in, or call us directly.',
  },
  limited: {
    title: 'Please wait a few minutes before trying again.',
    body: 'If you need us sooner, call or email. You don’t need to resend the form.',
  },
} as const

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: FieldError
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between text-[0.9375rem] font-semibold text-ink"
      >
        {label}
        {optional && <span className="text-sm font-normal text-ink-soft">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error?.message && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm font-medium text-danger"
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

function mailtoFor(data: ContactInput) {
  const body = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `I am a: ${roleLabel(data.role)}`,
    data.preferredTime ? `Preferred time to call: ${data.preferredTime}` : '',
  ]
    .filter((line) => line !== '')
    .join('\n')
  return `mailto:${primaryEmail}?subject=${encodeURIComponent('Callback request')}&body=${encodeURIComponent(body)}`
}

export function ContactForm() {
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [mailto, setMailto] = useState(`mailto:${primaryEmail}`)
  const [turnstileError, setTurnstileError] = useState<string>()
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileKey, setTurnstileKey] = useState(0)
  const statusRef = useRef<HTMLDivElement>(null)
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      preferredTime: '',
      role: '' as ContactRole,
      hp_leave_blank: '',
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (status !== 'idle') statusRef.current?.focus()
  }, [status])

  const onToken = useCallback((token: string) => {
    setTurnstileToken(token)
    if (token) setTurnstileError(undefined)
  }, [])

  const clearTurnstile = () => {
    setTurnstileToken('')
    setTurnstileKey((key) => key + 1)
  }

  const onSubmit = async (data: ContactInput) => {
    const link = mailtoFor(data)
    setMailto(link)
    if (turnstileSiteKey && !turnstileToken) {
      setTurnstileError('Please complete the security check and try again.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          'cf-turnstile-response': turnstileToken,
        }),
      })
      if (res.ok) {
        reset()
        clearTurnstile()
        setTurnstileError(undefined)
        setStatus('success')
        return
      }
      const body = (await res.json().catch(() => null)) as { error?: string } | null
      const error = body?.error
      setStatus(
        error === 'not_configured'
          ? 'unconfigured'
          : error === 'rate_limited'
            ? 'limited'
            : 'fallback',
      )
      clearTurnstile()
    } catch {
      setStatus('fallback')
      clearTurnstile()
    }
  }

  const ids = (name: keyof ContactInput, hint = false) =>
    [hint && `${uid}-${name}-hint`, errors[name] && `${uid}-${name}-error`]
      .filter(Boolean)
      .join(' ') || undefined

  if (status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-success/30 bg-success/5 p-8 outline-none"
      >
        <CircleCheck aria-hidden className="size-8 text-success" />
        <h3 className="mt-5 text-h3 text-ink">Thank you — we’ll call you back.</h3>
        <p className="mt-3 text-ink-soft">
          If you need us sooner, please call us at{' '}
          <a
            href={primaryPhone.href}
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            {primaryPhone.label}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 min-h-11 font-semibold text-brand underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  const banner = status === 'idle' ? null : fallbackCopy[status]

  return (
    <form
      method="post"
      action="/api/contact"
      onSubmit={handleSubmit(onSubmit)}
      noValidate={hydrated}
      className="grid gap-6"
    >
      {banner && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="rounded-lg border border-gold/40 bg-gold/8 p-6 outline-none"
        >
          <p className="font-semibold text-ink">{banner.title}</p>
          <p className="mt-2 text-[0.9375rem] text-ink-soft">{banner.body}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={mailto}
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
            >
              <Mail aria-hidden className="size-4" /> Email {primaryEmail}
            </a>
            {site.phones.map((phone) => (
              <a
                key={phone.e164}
                href={phone.href}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
              >
                <Phone aria-hidden className="size-4" /> {phone.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-line bg-bg-alt px-4 py-4 text-sm leading-relaxed text-ink-soft">
        <p>
          We’ll call you back. Please don’t share medical history, diagnoses, or other
          health details here.
        </p>
        <p className="mt-2">
          Prefer to call?{' '}
          <a
            href={primaryPhone.href}
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            {primaryPhone.label}
          </a>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Full name" error={errors.name}>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={ids('name')}
            className={inputClass}
            {...register('name')}
          />
        </Field>
        <Field id={`${uid}-phone`} label="Phone" error={errors.phone}>
          <input
            id={`${uid}-phone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            minLength={7}
            maxLength={40}
            pattern="[+()0-9 .\\-]{7,40}"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={ids('phone')}
            className={inputClass}
            {...register('phone')}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            inputMode="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={ids('email')}
            className={inputClass}
            {...register('email')}
          />
        </Field>
        <Field
          id={`${uid}-preferredTime`}
          label="Preferred time to call"
          optional
          hint="A short window is enough, such as weekday mornings."
          error={errors.preferredTime}
        >
          <input
            id={`${uid}-preferredTime`}
            type="text"
            autoComplete="off"
            maxLength={120}
            aria-invalid={errors.preferredTime ? true : undefined}
            aria-describedby={ids('preferredTime', true)}
            className={inputClass}
            {...register('preferredTime')}
          />
        </Field>
      </div>
      <Field id={`${uid}-role`} label="I am a…" error={errors.role}>
        <select
          id={`${uid}-role`}
          required
          aria-invalid={errors.role ? true : undefined}
          aria-describedby={ids('role')}
          className={selectClass}
          {...register('role')}
        >
          <option value="">Select one</option>
          {contactRoles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </Field>

      {turnstileSiteKey && (
        <div>
          <TurnstileWidget
            key={turnstileKey}
            siteKey={turnstileSiteKey}
            onToken={onToken}
          />
          {turnstileError && (
            <p
              id={`${uid}-turnstile-error`}
              role="alert"
              className="text-sm font-medium text-danger"
            >
              {turnstileError}
            </p>
          )}
          <noscript>
            <p className="text-sm text-ink-soft">
              The security check needs JavaScript. You can still call {primaryPhone.label}
              .
            </p>
          </noscript>
        </div>
      )}

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Leave blank</label>
        <input
          id={`${uid}-hp`}
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          {...register('hp_leave_blank')}
        />
      </div>
      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          Prefer to talk? Call{' '}
          <a
            href={primaryPhone.href}
            className="font-semibold text-brand hover:underline"
          >
            {primaryPhone.label}
          </a>
        </p>
        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          icon={
            isSubmitting ? (
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
            ) : (
              <Send aria-hidden className="size-4" />
            )
          }
        >
          {isSubmitting ? 'Sending…' : 'Request a call'}
        </SubmitButton>
      </div>
    </form>
  )
}
