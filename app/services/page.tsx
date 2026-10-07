import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button, TextLink } from '@/components/Button'
import { CTASection } from '@/components/CTASection'
import { Eyebrow } from '@/components/Eyebrow'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
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
                    className="border-line-strong bg-surface text-ink hover:border-brand hover:text-brand inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors"
                  >
                    <Icon aria-hidden className="text-gold-ink size-4" />
                    {s.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </PageHero>

      <div className="divide-line divide-y">
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
                  {s.image ? (
                    <div className="bg-bg-alt relative aspect-[5/4] overflow-hidden rounded-xl">
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder
                      icon={Icon}
                      label={`${s.name} photo placeholder`}
                      className="aspect-[5/4] rounded-xl"
                    />
                  )}
                </Reveal>
                <Reveal
                  delay={0.08}
                  className={cn(
                    'lg:col-span-6 xl:col-span-5',
                    reverse ? 'lg:order-1' : 'xl:col-start-8',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-bg-alt text-brand flex size-12 items-center justify-center rounded-md">
                      <Icon aria-hidden className="size-5.5" strokeWidth={1.6} />
                    </span>
                    <Eyebrow>{String(i + 1).padStart(2, '0')} / Service</Eyebrow>
                  </div>
                  <h2 id={`${s.slug}-heading`} className="text-h2 text-ink mt-6">
                    {s.name}
                  </h2>
                  <p className="font-display text-brand mt-4 text-xl italic">
                    {s.tagline}
                  </p>
                  <p className="text-ink-soft mt-6">{s.intro[0]}</p>
                  <ul className="border-line mt-7 grid gap-3 border-t pt-7 sm:grid-cols-2">
                    {s.includes.map((item) => (
                      <li key={item} className="text-ink flex gap-3 text-[0.9375rem]">
                        <Check aria-hidden className="text-brand mt-1 size-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <Button href={`/services/${s.slug}`} arrow>
                      Learn more<span className="sr-only"> about {s.name}</span>
                    </Button>
                    <TextLink href={`/contact?service=${s.slug}`}>
                      Ask about this service
                    </TextLink>
                  </div>
                </Reveal>
              </div>
            </section>
          )
        })}
      </div>

      <section
        aria-labelledby="unsure-heading"
        className="border-line bg-bg-alt border-t"
      >
        <div className="container-page grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-20">
          <div className="md:col-span-8">
            <h2 id="unsure-heading" className="text-h3 text-ink">
              Not sure which service fits?
            </h2>
            <p className="text-ink-soft mt-3 max-w-2xl">
              That’s completely okay. Some people benefit from more than one service, and
              needs can change over time. Tell us a little about your situation and we’ll
              talk it through together.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Button href="/contact" size="lg" arrow>
              Talk with our team
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
