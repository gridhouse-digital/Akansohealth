import Image from 'next/image'
import { Check, HandHeart, Home, Sprout, UsersRound } from 'lucide-react'
import { Button } from '@/components/Button'
import { CTASection } from '@/components/CTASection'
import { Eyebrow } from '@/components/Eyebrow'
import { JotformEmbed } from '@/components/JotformEmbed'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionIntro } from '@/components/SectionIntro'
import { ValueCard } from '@/components/ValueCard'
import { pageMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Careers',
  description:
    'Join the Akansoh Health Services team in Doylestown, PA. Help individuals with intellectual and developmental disabilities live independently, with dignity and connected to their community.',
  path: '/careers',
})

const purpose = [
  {
    icon: HandHeart,
    title: 'Dignity in every visit',
    text: 'Treat each person with respect and patience, and honor their choices about how they live their life.',
  },
  {
    icon: Sprout,
    title: 'Growing independence',
    text: 'Encourage people to do more for themselves, building the confidence and skills that lead to greater independence.',
  },
  {
    icon: UsersRound,
    title: 'Connection to community',
    text: 'Help people stay engaged with their neighborhoods — errands, activities, appointments and time with friends.',
  },
  {
    icon: Home,
    title: 'Support for families',
    text: 'Work alongside families and caregivers as part of a support system that pulls in the same direction.',
  },
]

const qualities = [
  'You’re compassionate, patient and respectful.',
  'You listen first and let the person lead.',
  'You communicate clearly with individuals, families and teammates.',
  'You’re dependable and take pride in showing up.',
  'You believe everyone has the right to choose their own path.',
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Join a team that puts <em className="text-brand">people first.</em>
          </>
        }
        description="At Akansoh Health Services, we support individuals with intellectual and developmental disabilities to live independently and with dignity. If you’re passionate about making a difference in people’s lives, we’d love to hear from you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-alt shadow-md">
            <Image
              src="/images/careers.jpg"
              alt="Three support professionals in green sharing a laugh over coffee around a table in a bright, plant-filled break room"
              fill
              priority
              sizes="(min-width: 82rem) 31rem, (min-width: 56rem) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#apply" size="lg" arrow>
            Apply now
          </Button>
          <Button href="/about" variant="secondary" size="lg">
            About Akansoh
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="purpose-heading" className="section-y">
        <div className="container-page">
          <SectionIntro
            id="purpose-heading"
            eyebrow="Why this work matters"
            title={
              <>
                Work that matters to{' '}
                <em className="text-brand">the person in front of you.</em>
              </>
            }
            description="Every service we offer is shaped around the individual receiving it. Our team helps people live well at home, get where they need to go and take part in the life of their community."
          />
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {purpose.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <ValueCard icon={p.icon} title={p.title}>
                  {p.text}
                </ValueCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="expect-heading" className="bg-bg-alt section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Who we’re looking for</Eyebrow>
            <h2 id="expect-heading" className="mt-5 text-h2 text-ink">
              {'Caring people who '}
              <em className="text-brand">show up.</em>
            </h2>
            <p className="mt-6 text-lead text-ink-soft">
              Our team includes registered nurses and skilled caregivers. What brings us
              together is how we treat the people we support.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="grid gap-8 lg:col-span-7 lg:pt-4">
            <div className="rounded-xl border border-line bg-surface p-7 sm:p-10">
              <h3 className="text-h3 text-ink">What matters to us</h3>
              <ul className="mt-6 grid gap-4">
                {qualities.map((q) => (
                  <li key={q} className="flex gap-3 text-ink-soft">
                    <Check aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-surface p-7 sm:p-10">
              <h3 className="text-h3 text-ink">The support our team provides</h3>
              <p className="mt-3 text-ink-soft">
                Our professionals work across each of our services:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {services.map((s) => (
                  <li
                    key={s.slug}
                    className="rounded-full border border-line-strong bg-bg px-3.5 py-1.5 text-sm text-ink"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-heading" className="section-y">
        <div className="container-page">
          <SectionIntro
            id="apply-heading"
            eyebrow="Apply"
            layout="stacked"
            title={
              <>
                Apply to join <em className="text-brand">our team.</em>
              </>
            }
            description="Tell us a little about yourself, your experience and the kind of work you’re interested in."
          />
          <Reveal delay={0.08} className="mt-12">
            <JotformEmbed
              url={site.jotformCareersUrl}
              title="Akansoh Health Services job application form"
              placeholderTitle="Our online application is almost ready."
              placeholderText="In the meantime, we’d still love to hear from you. Give us a call, or email a short note about yourself and the kind of work you’re interested in — feel free to attach your résumé."
              emailSubject="Job application"
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Questions about working with us?"
        description="Call or email our team — we’re happy to talk about the work we do and how you might fit in."
        cta="Contact Us"
      />
    </>
  )
}
