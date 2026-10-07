import Image from 'next/image'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { fullAddress, mainNav, mapsUrl, site } from '@/lib/site'
import { services } from '@/lib/services'

const linkClass =
  'inline-flex min-h-9 items-center text-[0.9375rem] text-ink-soft transition-colors hover:text-brand'

export function Footer() {
  return (
    <footer className="border-line bg-bg-alt border-t">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-12 lg:col-span-4">
          <Link
            href="/"
            aria-label="Akansoh Health Services — home"
            className="inline-block"
          >
            <Image
              src="/brand/akansoh-logo-600.png"
              alt="Akansoh Health Services — People, Purpose, Possibility"
              width={600}
              height={590}
              sizes="160px"
              className="h-auto w-36"
            />
          </Link>
          <p className="text-ink-soft mt-6 max-w-sm text-[0.9375rem]">
            Compassionate, person-centered support that helps individuals live
            independently and with dignity — building a healthy community, one individual
            at a time.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2">
          <h2 className="text-eyebrow text-gold-ink font-sans font-bold uppercase">
            Explore
          </h2>
          <ul className="mt-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="md:col-span-4 lg:col-span-3">
          <h2 className="text-eyebrow text-gold-ink font-sans font-bold uppercase">
            Services
          </h2>
          <ul className="mt-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-5 lg:col-span-3">
          <h2 className="text-eyebrow text-gold-ink font-sans font-bold uppercase">
            Contact
          </h2>
          <ul className="text-ink-soft mt-4 grid gap-3 text-[0.9375rem]">
            <li className="flex gap-3">
              <MapPin aria-hidden className="text-brand mt-1 size-4 shrink-0" />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand"
              >
                {fullAddress}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="text-brand mt-1 size-4 shrink-0" />
              <span className="grid">
                {site.phones.map((p) => (
                  <a key={p.e164} href={p.href} className="hover:text-brand">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden className="text-brand mt-1 size-4 shrink-0" />
              <span className="grid min-w-0">
                {site.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="hover:text-brand break-all">
                    {e}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden className="text-brand mt-1 size-4 shrink-0" />
              {site.hours.label}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-line border-t">
        <div className="container-page text-ink-soft flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-[0.75rem] tracking-[0.18em] uppercase">
            People · Purpose · Possibility
          </p>
        </div>
      </div>
    </footer>
  )
}
