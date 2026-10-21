import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check, Phone } from 'lucide-react'
import { Button } from '@/components/Button'
import { CTASection } from '@/components/CTASection'
import { Eyebrow } from '@/components/Eyebrow'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ServiceCard } from '@/components/ServiceCard'
import { pageMetadata, serviceJsonLd } from '@/lib/seo'
import { getService, services } from '@/lib/services'
import { primaryPhone, site } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return pageMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const index = services.findIndex((s) => s.slug === service.slug)
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length])

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={service.name}
        description={service.summary}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
        aside={
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden arch bg-bg-alt shadow-md lg:ml-auto">
            <Image
              src={service.heroImage.src}
              alt={service.heroImage.alt}
              fill
              priority
              sizes="(min-width: 24rem) 24rem, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg" arrow>
            Ask about this service
          </Button>
          <Button
            href={primaryPhone.href}
            size="lg"
            variant="secondary"
            icon={<Phone aria-hidden className="size-4" />}
          >
            {primaryPhone.label}
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="overview-heading" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Overview</Eyebrow>
            <h2 id="overview-heading" className="mt-5 text-h2 text-ink">
              {service.tagline}
            </h2>
            <div className="mt-8 space-y-5 text-ink-soft">
              {service.intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lead' : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-xl border border-line bg-surface p-8 sm:p-10">
              <h3 className="text-[1.625rem] leading-tight text-ink">
                What this support can include
              </h3>
              <ul className="mt-7 grid gap-4">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3.5 border-t border-line pt-4 text-ink first:border-t-0 first:pt-0"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-alt">
                      <Check aria-hidden className="size-3.5 text-brand" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-6 text-sm text-ink-soft">
                Every plan is shaped around the individual. Talk with our team about what
                support would look like for you or your loved one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="on-deep bg-deep section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <Eyebrow tone="light">Our approach</Eyebrow>
            <h2 id="approach-heading" className="mt-5 text-h2 text-on-deep">
              Person-centered, <em className="text-gold">from the first conversation.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-on-deep-muted lg:col-span-5">
            <p className="text-lead">
              We combine compassion and healthcare to help individuals live independently
              and with dignity.
            </p>
            <p>
              That means listening first, respecting each person’s choices, and keeping
              communication open with families and caregivers along the way.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>More ways we help</Eyebrow>
              <h2 id="related-heading" className="mt-5 text-h2 text-ink">
                Related services
              </h2>
            </div>
            <Button href="/services" variant="secondary" arrow>
              All services
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Interested in ${service.name}?`}
        description={`Talk with our team about how ${site.name} can support you or your loved one.`}
      />
      <JsonLd data={serviceJsonLd(service.slug)} />
    </>
  )
}
