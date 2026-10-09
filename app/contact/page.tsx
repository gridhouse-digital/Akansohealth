import Link from 'next/link'
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { Eyebrow } from '@/components/Eyebrow'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { pageMetadata } from '@/lib/seo'
import { fullAddress, mapsUrl, site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Contact Akansoh Health Services in Doylestown, PA. Call (347) 822-7070 or send us a message to talk about support for you or your loved one.',
  path: '/contact',
})

export default function ContactPage() {
  const configured = Boolean(process.env.CONTACT_FORM_ENDPOINT)

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let’s talk about <em className="text-brand">the support you need.</em>
          </>
        }
        description="Whether you have a question, have a referral, want to request services, or simply aren’t sure where to start — we’re here to help. Reach out in the way that’s easiest for you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section aria-label="Contact details and form" className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="on-deep rounded-xl bg-deep p-8 text-on-deep sm:p-10">
              <h2 className="text-h3 text-on-deep">Contact Akansoh Health Services</h2>
              <ul className="mt-8 grid gap-7">
                <li className="flex gap-4">
                  <Phone aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-eyebrow font-bold text-gold uppercase">Phone</p>
                    <div className="mt-2 grid gap-1">
                      {site.phones.map((p) => (
                        <a
                          key={p.e164}
                          href={p.href}
                          className="inline-flex min-h-9 items-center text-lg hover:text-white hover:underline"
                        >
                          {p.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div className="min-w-0">
                    <p className="text-eyebrow font-bold text-gold uppercase">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-2 inline-flex min-h-9 items-center [overflow-wrap:anywhere] hover:text-white hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-eyebrow font-bold text-gold uppercase">Address</p>
                    <address className="mt-2 not-italic">
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.region} {site.address.postalCode}
                    </address>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-gold hover:underline"
                    >
                      Get directions <ExternalLink aria-hidden className="size-3.5" />
                      <span className="sr-only">(opens Google Maps in a new tab)</span>
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-eyebrow font-bold text-gold uppercase">Hours</p>
                    <p className="mt-2">{site.hours.label}</p>
                  </div>
                </li>
              </ul>
            </div>
            {site.jotformUrl && (
              <div className="mt-5 rounded-xl border border-line bg-surface p-7">
                <p className="font-semibold text-ink">Prefer our full intake form?</p>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  Share more detail about the support you’re looking for using our online
                  intake form.
                </p>
                <a
                  href={site.jotformUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
                >
                  Open the intake form <ExternalLink aria-hidden className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            )}
            <p className="mt-5 px-1 text-[0.9375rem] text-ink-soft">
              Interested in working with us?{' '}
              <Link href="/careers" className="font-semibold text-brand hover:underline">
                Join our team
              </Link>
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-xl border border-line bg-surface p-7 shadow-sm sm:p-10">
              <Eyebrow>Send us a message</Eyebrow>
              <h2 className="mt-4 text-h3 text-ink">We’re glad you’re reaching out.</h2>
              <p className="mt-3 text-ink-soft">
                Contact us with questions, service requests or anything else on your mind.
                Fields are required unless marked optional.
              </p>
              <div className="relative mt-8">
                <ContactForm configured={configured} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="visit-heading"
        className="border-t border-line bg-surface"
      >
        <div className="container-page grid gap-6 py-14 md:grid-cols-12 md:items-center">
          <h2 id="visit-heading" className="text-h3 text-ink md:col-span-5">
            Based in Doylestown, Pennsylvania
          </h2>
          <p className="text-ink-soft md:col-span-5">{fullAddress}</p>
          <div className="md:col-span-2 md:text-right">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
            >
              Map <ExternalLink aria-hidden className="size-4" />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
