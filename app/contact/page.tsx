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
        description="Whether you have a question, want to request services, or simply aren’t sure where to start — we’re here to help. Reach out in the way that’s easiest for you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section aria-label="Contact details and form" className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="on-deep bg-deep text-on-deep rounded-xl p-8 sm:p-10">
              <h2 className="text-h3 text-on-deep">Contact Akansoh Health Services</h2>
              <ul className="mt-8 grid gap-7">
                <li className="flex gap-4">
                  <Phone aria-hidden className="text-gold mt-1 size-5 shrink-0" />
                  <div>
                    <p className="text-eyebrow text-gold font-bold uppercase">Phone</p>
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
                  <Mail aria-hidden className="text-gold mt-1 size-5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-eyebrow text-gold font-bold uppercase">Email</p>
                    <div className="mt-2 grid gap-1">
                      {site.emails.map((e) => (
                        <a
                          key={e}
                          href={`mailto:${e}`}
                          className="inline-flex min-h-9 items-center break-all hover:text-white hover:underline"
                        >
                          {e}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin aria-hidden className="text-gold mt-1 size-5 shrink-0" />
                  <div>
                    <p className="text-eyebrow text-gold font-bold uppercase">Address</p>
                    <address className="mt-2 not-italic">
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.region} {site.address.postalCode}
                    </address>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold mt-2 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold hover:underline"
                    >
                      Get directions <ExternalLink aria-hidden className="size-3.5" />
                      <span className="sr-only">(opens Google Maps in a new tab)</span>
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock aria-hidden className="text-gold mt-1 size-5 shrink-0" />
                  <div>
                    <p className="text-eyebrow text-gold font-bold uppercase">Hours</p>
                    <p className="mt-2">{site.hours.label}</p>
                  </div>
                </li>
              </ul>
            </div>
            {site.jotformUrl && (
              <div className="border-line bg-surface mt-5 rounded-xl border p-7">
                <p className="text-ink font-semibold">Prefer our full intake form?</p>
                <p className="text-ink-soft mt-2 text-[0.9375rem]">
                  Share more detail about the support you’re looking for using our secure
                  online form.
                </p>
                <a
                  href={site.jotformUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand mt-4 inline-flex min-h-11 items-center gap-2 font-semibold hover:underline"
                >
                  Open the intake form <ExternalLink aria-hidden className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="border-line bg-surface rounded-xl border p-7 shadow-sm sm:p-10">
              <Eyebrow>Send us a message</Eyebrow>
              <h2 className="text-h3 text-ink mt-4">We’re glad you’re reaching out.</h2>
              <p className="text-ink-soft mt-3">
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

      <section aria-labelledby="visit-heading" className="border-line bg-bg-alt border-t">
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
              className="text-brand inline-flex min-h-11 items-center gap-2 font-semibold hover:underline"
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
