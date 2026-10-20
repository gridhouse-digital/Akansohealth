import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button, TextLink } from '@/components/Button'
import { CTASection } from '@/components/CTASection'
import { Eyebrow } from '@/components/Eyebrow'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { pageMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { cn } from '@/lib/utils'

export const metadata = pageMetadata({
  title: 'Our Services',
  description:
    'Companion services, homemaker/chore, transportation, community participation support, shift nursing and respite care — person-centered support from Akansoh Health Services.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            Support for daily life, <em className="text-brand">health and belonging.</em>
          </>
        }
        description="Six services, one approach: care that is shaped around each individual. Explore what we offer, then talk with our team about what would help most."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      >
        <nav aria-label="Jump to a service">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon aria-hidden className="size-4 text-gold-ink" />
                    {s.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </PageHero>

      <div className="divide-y divide-line">
        {services.map((s, i) => {
          const Icon = s.icon
          const reverse = i % 2 === 1
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-heading`}
              className={cn('section-y', i % 2 === 1 && 'bg-surface-muted')}
            >
              <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal
                  y={24}
                  className={cn(
                    'lg:col-span-6',
                    reverse ? 'lg:order-2 lg:col-start-7' : '',
                  )}
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-bg-alt">
                    <Image
                      src={s.cardImage.src}
                      alt={s.cardImage.alt}
                      fill
                      sizes="(min-width: 82rem) 36rem, (min-width: 56rem) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                <Reveal
                  delay={0.08}
                  className={cn(
                    'lg:col-span-6 xl:col-span-5',
                    reverse ? 'lg:order-1' : 'xl:col-start-8',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-md bg-bg-alt text-brand">
                      <Icon aria-hidden className="size-5.5" strokeWidth={1.6} />
                    </span>
                    <Eyebrow>{String(i + 1).padStart(2, '0')} / Service</Eyebrow>
                  </div>
                  <h2 id={`${s.slug}-heading`} className="mt-6 text-h2 text-ink">
                    {s.name}
                  </h2>
                  <p className="mt-4 font-display text-xl text-brand italic">
                    {s.tagline}
                  </p>
                  <p className="mt-6 text-ink-soft">{s.intro[0]}</p>
                  <ul className="mt-7 grid gap-3 border-t border-line pt-7 sm:grid-cols-2">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] text-ink">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <Button href={`/services/${s.slug}`} arrow>
                      Learn more<span className="sr-only"> about {s.name}</span>
                    </Button>
                    <TextLink href="/contact">Ask about this service</TextLink>
                  </div>
                </Reveal>
              </div>
            </section>
          )
        })}
      </div>

      <CTASection
        title="Not sure which service fits?"
        description="That’s completely okay. Some people benefit from more than one service, and needs can change over time. Call us and we’ll talk it through together."
        cta="Talk with our team"
      />
    </>
  )
}
