'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, LoaderCircle, Mail, Phone, Send } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { useForm, type FieldError } from 'react-hook-form'
import {
  contactReasons,
  contactSchema,
  reasonLabel,
  type ContactInput,
} from '@/lib/contact'
import { primaryEmail, primaryPhone, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { SubmitButton } from './Button'

type Status = 'idle' | 'success' | 'fallback'

const subscribe = () => () => {}

const inputClass =
  'block w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 transition-[border-color,box-shadow] outline-none focus:border-brand focus:ring-3 focus:ring-brand/15 aria-invalid:border-danger aria-invalid:focus:ring-danger/15'

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
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : '',
    `Reason: ${reasonLabel(data.reason)}`,
    '',
    data.message,
  ]
    .filter((l) => l !== '')
    .join('\n')
  return `mailto:${primaryEmail}?subject=${encodeURIComponent(
    `Inquiry — ${reasonLabel(data.reason)}`,
  )}&body=${encodeURIComponent(body)}`
}

export function ContactForm({ configured }: { configured: boolean }) {
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [mailto, setMailto] = useState(`mailto:${primaryEmail}`)
  const statusRef = useRef<HTMLDivElement>(null)
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      reason: 'request-services',
      message: '',
      company: '',
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get('service')
    if (service && contactReasons.some((r) => r.value === service)) {
      setValue('reason', service)
    }
  }, [setValue])

  useEffect(() => {
    if (status !== 'idle') statusRef.current?.focus()
  }, [status])

  const onSubmit = async (data: ContactInput) => {
    const link = mailtoFor(data)
    setMailto(link)
    if (!configured) {
      setStatus('fallback')
      return
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(String(res.status))
      reset()
      setStatus('success')
    } catch {
      setStatus('fallback')
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
        <h3 className="mt-5 text-h3 text-ink">Thank you — your message is on its way.</h3>
        <p className="mt-3 text-ink-soft">
          Our team will be in touch. If your question is time-sensitive, please call us at{' '}
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
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      method="post"
      action="/api/contact"
      onSubmit={handleSubmit(onSubmit)}
      noValidate={hydrated}
      className="grid gap-6"
    >
      {status === 'fallback' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="rounded-lg border border-gold/40 bg-gold/8 p-6 outline-none"
        >
          <p className="font-semibold text-ink">
            {configured
              ? 'We couldn’t send your message just now.'
              : 'Almost there — send your message by email or phone.'}
          </p>
          <p className="mt-2 text-[0.9375rem] text-ink-soft">
            Your details are ready to go. Open your email app with the message filled in,
            or call us directly.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={mailto}
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
            >
              <Mail aria-hidden className="size-4" /> Email {primaryEmail}
            </a>
            {site.phones.map((p) => (
              <a
                key={p.e164}
                href={p.href}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
              >
                <Phone aria-hidden className="size-4" /> {p.label}
              </a>
            ))}
          </div>
        </div>
      )}

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
        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            required
            inputMode="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={ids('email')}
            className={inputClass}
            {...register('email')}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-phone`} label="Phone" optional error={errors.phone}>
          <input
            id={`${uid}-phone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={ids('phone')}
            className={inputClass}
            {...register('phone')}
          />
        </Field>
        <Field
          id={`${uid}-reason`}
          label="Reason for contacting us"
          error={errors.reason}
        >
          <select
            id={`${uid}-reason`}
            aria-invalid={errors.reason ? true : undefined}
            aria-describedby={ids('reason')}
            className={cn(
              inputClass,
              'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%231b4b3b%27 stroke-width=%272%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11',
            )}
            {...register('reason')}
          >
            {contactReasons.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field
        id={`${uid}-message`}
        label="How can we help?"
        hint="Share as much or as little as you’re comfortable with. Please don’t include detailed medical information."
        error={errors.message}
      >
        <textarea
          id={`${uid}-message`}
          rows={6}
          required
          minLength={10}
          maxLength={4000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={ids('message', true)}
          className={cn(inputClass, 'resize-y')}
          {...register('message')}
        />
      </Field>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
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
          {isSubmitting ? 'Sending…' : 'Send message'}
        </SubmitButton>
      </div>
    </form>
  )
}
