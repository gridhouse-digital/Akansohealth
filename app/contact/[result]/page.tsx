import type { Metadata } from 'next'
import { Mail, Phone } from 'lucide-react'
import { Button } from '@/components/Button'
import { Eyebrow } from '@/components/Eyebrow'
import { primaryEmail, site } from '@/lib/site'

const results = {
  sent: {
    eyebrow: 'Message sent',
    title: 'Thank you — your message is on its way.',
    body: 'Our team will be in touch. If your question is time-sensitive, please call us.',
  },
  'not-sent': {
    eyebrow: 'Message not sent',
    title: 'We couldn’t send your message.',
    body: 'Something was missing or our form is temporarily unavailable. Please go back and check your details, or reach us directly by phone or email.',
  },
} as const

type Result = keyof typeof results

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(results).map((result) => ({ result }))
}

export const metadata: Metadata = {
  title: 'Contact',
  robots: { index: false, follow: true },
}

export default async function ContactResultPage({
  params,
}: PageProps<'/contact/[result]'>) {
  const { result } = await params
  const copy = results[result as Result]

  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h1 className="mt-6 text-h1 text-ink">{copy.title}</h1>
        <p className="mt-6 text-lead text-ink-soft">{copy.body}</p>
        <ul className="mt-8 grid gap-2 text-ink">
          {site.phones.map((p) => (
            <li key={p.e164}>
              <a
                href={p.href}
                className="inline-flex min-h-11 items-center gap-2.5 font-semibold text-brand hover:underline"
              >
                <Phone aria-hidden className="size-4" /> {p.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${primaryEmail}`}
              className="inline-flex min-h-11 items-center gap-2.5 font-semibold [overflow-wrap:anywhere] text-brand hover:underline"
            >
              <Mail aria-hidden className="size-4 shrink-0" /> {primaryEmail}
            </a>
          </li>
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          {result === 'not-sent' && (
            <Button href="/contact" arrow>
              Back to the form
            </Button>
          )}
          <Button href="/" variant={result === 'not-sent' ? 'secondary' : 'primary'}>
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}
