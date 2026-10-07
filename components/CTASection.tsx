import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import { primaryEmail, site } from '@/lib/site'
import { Button } from './Button'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

type CTASectionProps = {
  title?: string
  description?: string
  cta?: string
}

export function CTASection({
  title = 'Let’s find the right support for you.',
  description = 'Talk with our team about how Akansoh Health Services can support you or your loved one.',
  cta = 'Contact Our Team',
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-heading" className="section-y">
      <div className="container-page">
        <Reveal className="on-deep relative isolate overflow-hidden rounded-xl bg-deep px-6 py-14 sm:px-10 md:px-14 md:py-20 lg:px-20">
          <Image
            src="/brand/akansoh-mark.png"
            alt=""
            width={582}
            height={577}
            aria-hidden
            className="pointer-events-none absolute -right-16 -bottom-24 -z-10 w-[26rem] opacity-[0.07] md:-right-10 md:w-[34rem]"
          />
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="light">Get in touch</Eyebrow>
              <h2 id="cta-heading" className="mt-5 text-h2 text-on-deep">
                {title}
              </h2>
              <p className="mt-6 max-w-xl text-lead text-on-deep-muted">{description}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/contact" variant="light" size="lg" arrow>
                  {cta}
                </Button>
                <Button href="/services" variant="outline-light" size="lg">
                  Explore Our Services
                </Button>
              </div>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 lg:col-span-5">
              {site.phones.map((p) => (
                <li key={p.e164} className="bg-deep">
                  <a
                    href={p.href}
                    className="flex min-h-16 items-center gap-4 px-6 text-on-deep transition-colors hover:bg-white/5"
                  >
                    <Phone aria-hidden className="size-4 text-gold" />
                    <span className="text-lg">{p.label}</span>
                  </a>
                </li>
              ))}
              <li className="bg-deep">
                <a
                  href={`mailto:${primaryEmail}`}
                  className="flex min-h-16 items-center gap-4 px-6 text-on-deep transition-colors hover:bg-white/5"
                >
                  <Mail aria-hidden className="size-4 shrink-0 text-gold" />
                  <span className="min-w-0 text-[0.9375rem] [overflow-wrap:anywhere] sm:text-base">
                    {primaryEmail}
                  </span>
                </a>
              </li>
              <li className="bg-deep px-6 py-4 text-sm text-on-deep-muted">
                {site.hours.label}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
