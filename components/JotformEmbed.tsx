import { ClipboardList, ExternalLink, Mail, Phone } from 'lucide-react'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

type JotformEmbedProps = {
  url?: string
  title: string
  placeholderTitle?: string
  placeholderText?: string
  emailSubject?: string
  className?: string
}

export function JotformEmbed({
  url,
  title,
  placeholderTitle = 'Our online form is almost ready.',
  placeholderText = 'In the meantime, you can reach our team directly by phone or email.',
  emailSubject,
  className,
}: JotformEmbedProps) {
  if (!url) {
    const mailto = `mailto:${site.email}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ''}`
    return (
      <div
        data-state="placeholder"
        className={cn(
          'rounded-xl border border-dashed border-line-strong bg-surface p-7 sm:p-10',
          className,
        )}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-bg-alt text-brand">
            <ClipboardList aria-hidden strokeWidth={1.5} className="size-7" />
          </span>
          <div className="min-w-0">
            <p className="text-eyebrow font-bold text-gold-ink uppercase">Coming soon</p>
            <h3 className="mt-3 text-h3 text-ink">{placeholderTitle}</h3>
            <p className="mt-3 max-w-2xl text-ink-soft">{placeholderText}</p>
            <ul className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              {site.phones.map((p) => (
                <li key={p.e164}>
                  <a
                    href={p.href}
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong bg-surface px-5 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    <Phone aria-hidden className="size-4 text-gold-ink" />
                    {p.label}
                  </a>
                </li>
              ))}
              <li className="min-w-0">
                <a
                  href={mailto}
                  className="inline-flex min-h-11 max-w-full items-center gap-2.5 rounded-full bg-brand px-5 font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  <Mail aria-hidden className="size-4 shrink-0" />
                  <span className="min-w-0 [overflow-wrap:anywhere]">{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-surface',
        className,
      )}
    >
      <iframe
        src={url}
        title={title}
        loading="lazy"
        allow="fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block h-[70rem] min-h-[900px] w-full border-0 sm:h-[60rem]"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-muted px-6 py-4 text-sm text-ink-soft">
        <p>Trouble viewing the form?</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
        >
          Open the form in a new tab <ExternalLink aria-hidden className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
      <noscript>
        <p className="px-6 pb-4 text-sm text-ink-soft">
          If the form doesn’t load, <a href={url}>open it directly</a>.
        </p>
      </noscript>
    </div>
  )
}
