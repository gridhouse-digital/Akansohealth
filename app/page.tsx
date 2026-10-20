import Image from 'next/image'
import {
  Compass,
  HandHeart,
  HeartHandshake,
  ShieldCheck,
  Sprout,
  UsersRound,
} from 'lucide-react'
import { Button, TextLink } from '@/components/Button'
import { CTASection } from '@/components/CTASection'
import { Eyebrow } from '@/components/Eyebrow'
import { FeatureSplit } from '@/components/FeatureSplit'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { SectionIntro } from '@/components/SectionIntro'
import { ServiceGrid } from '@/components/ServiceGrid'
import { TestimonialCard } from '@/components/TestimonialCard'
import { ValueCard } from '@/components/ValueCard'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { testimonials } from '@/lib/testimonials'

export const metadata = {
  ...pageMetadata({
    title: `${site.name} | Compassionate, Person-Centered Support`,
    description:
      'Compassionate, person-centered support from Akansoh Health Services: companion services, homemaker/chore, transportation, community participation support, shift nursing and respite care.',
    path: '/',
  }),
  title: { absolute: `${site.name} | Compassionate, Person-Centered Support` },
}

const pillars = [
  {
    icon: Compass,
    title: 'Person-Centered Care',
    text: 'Support shaped around each person’s needs, goals and choices.',
  },
  {
    icon: HeartHandshake,
    title: 'Compassionate Support',
    text: 'Kindness, patience and respect in every interaction.',
  },
  {
    icon: UsersRound,
    title: 'Community Integration',
    text: 'Staying connected to the people and places that matter.',
  },
  {
    icon: ShieldCheck,
    title: 'Professional Care',
    text: 'An experienced team of nurses and skilled caregivers.',
  },
]

const reasons = [
  {
    icon: Compass,
    title: 'Individualized Support',
    text: 'We tailor our services to each person’s unique needs, creating a personal path toward wellness and independence.',
  },
  {
    icon: HandHeart,
    title: 'Compassionate Professionals',
    text: 'Our team includes registered nurses and skilled caregivers who bring both expertise and genuine care to their work.',
  },
  {
    icon: Sprout,
    title: 'Independence & Dignity',
    text: 'We believe every person has the right to make their own choices and shape their own life — and we support them in doing so.',
  },
  {
    icon: UsersRound,
    title: 'Community-Focused Care',
    text: 'We encourage social participation and community involvement, helping individuals stay connected and engaged.',
  },
]

const steps = [
  {
    title: 'Reach out',
    text: 'Call, email, or request a callback. We’ll phone you — please don’t include medical details in the form.',
  },
  {
    title: 'Talk it through',
    text: 'We listen to your needs, routines and goals, and answer your questions about our services.',
  },
  {
    title: 'Shape a plan together',
    text: 'Together, we explore which services may be the right fit — centered on the person, not a program.',
  },
  {
    title: 'Stay connected',
    text: 'We keep communication open with individuals, families and caregivers as support continues.',
  },
]

export default function HomePage() {
  const [featured, ...others] = testimonials

  return (
    <>
      <Hero />

      <section
        aria-labelledby="pillars-heading"
        className="border-y border-line bg-surface"
      >
        <h2 id="pillars-heading" className="sr-only">
          What guides our care
        </h2>
        <ul className="container-page grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.05}
              className="flex gap-4 border-line py-7 xs:px-5 first:xs:pl-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0"
            >
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className="mt-0.5 size-6 shrink-0 text-gold-ink"
              />
              <div>
                <h3 className="font-sans text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="services-heading" className="section-y">
        <div className="container-page">
          <SectionIntro
            id="services-heading"
            eyebrow="Our services"
            title={
              <>
                Support designed around <em className="text-brand">the individual.</em>
              </>
            }
            description="From help at home to time out in the community, each service is shaped around the person we support — their routines, their goals and the life they want to live."
            aside={<TextLink href="/services">View all services</TextLink>}
          />
          <div className="mt-14 md:mt-16">
            <ServiceGrid />
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-heading" className="bg-bg-alt section-y">
        <div className="container-page">
          <FeatureSplit
            headingId="mission-heading"
            eyebrow="Our mission"
            title={
              <>
                {'Care that respects the person '}
                <em className="text-brand">behind the need.</em>
              </>
            }
            image={{
              src: '/images/home-respect.jpg',
              alt: 'A support professional listening as a man explains the weekly schedule he drew at the kitchen table',
            }}
          >
            <p className="text-lead">
              We are committed to delivering high-quality, person-centered healthcare
              services that empower individuals to live independently and with dignity.
            </p>
            <p>
              Our mission is to support individuals with developmental disabilities to
              achieve greater independence and function at their highest potential. People
              are better equipped when they are anchored in a cohesive support system —
              and every person has the right to choose their own path.
            </p>
            <blockquote className="border-l-2 border-gold pl-5 font-display text-[1.375rem] leading-snug text-ink italic">
              “Building a healthy community, one individual at a time.”
            </blockquote>
            <div className="pt-2">
              <TextLink href="/about">Read our story</TextLink>
            </div>
          </FeatureSplit>
        </div>
      </section>

      <section
        aria-labelledby="why-heading"
        className="on-deep relative isolate overflow-hidden bg-deep section-y"
      >
        <Image
          src="/brand/akansoh-mark.png"
          alt=""
          aria-hidden
          width={582}
          height={577}
          className="pointer-events-none absolute -top-20 -left-24 -z-10 w-[30rem] opacity-[0.05]"
        />
        <div className="container-page">
          <SectionIntro
            id="why-heading"
            tone="light"
            eyebrow="Why Akansoh"
            title={
              <>
                Support that starts with <em className="text-gold">who you are.</em>
              </>
            }
            description="We see the whole person — not a diagnosis or a list of tasks. That shapes how we listen, how we plan and how we show up every day."
          />
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <ValueCard icon={r.icon} title={r.title} tone="light">
                  {r.text}
                </ValueCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="community-heading" className="section-y">
        <div className="container-page">
          <div className="relative">
            <Reveal y={24}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-alt sm:aspect-[16/9] lg:aspect-[21/9]">
                <Image
                  src="/images/home-belonging.jpg"
                  alt="Adults and neighbours planting seedlings together at a community garden with a support professional"
                  fill
                  sizes="(min-width: 82rem) 76rem, 100vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
            </Reveal>
            <Reveal
              delay={0.1}
              className="relative z-10 mx-4 -mt-16 rounded-lg border border-line bg-surface p-7 shadow-lg sm:mx-8 sm:p-9 lg:absolute lg:right-10 lg:-bottom-12 lg:mx-0 lg:mt-0 lg:max-w-lg lg:p-11"
            >
              <Eyebrow>Community Participation Support</Eyebrow>
              <h2 id="community-heading" className="mt-5 text-h3 text-ink">
                Belonging happens out in the world.
              </h2>
              <p className="mt-4 text-ink-soft">
                We support individuals to take part in their community, enjoy meaningful
                activities and build friendships of their own — with inclusion and
                empowerment at the heart of it.
              </p>
              <div className="mt-7">
                <Button href="/services/community-participation-support" arrow>
                  Explore community support
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="bg-bg-alt section-y lg:mt-12">
        <div className="container-page">
          <SectionIntro
            id="steps-heading"
            eyebrow="How we support you"
            title="A simple, personal way to get started."
            description="Reaching out is the first step. From there, we take the time to understand what support would make the biggest difference."
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.06}
                className="flex flex-col bg-surface p-7 lg:p-8"
              >
                <span className="font-display text-[3.25rem] leading-none text-gold italic">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-[1.5rem] leading-tight text-ink">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {s.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="section-y">
        <div className="container-page">
          <FeatureSplit
            reverse
            shape="arch"
            headingId="about-heading"
            eyebrow="About Akansoh"
            title={
              <>
                {'Compassion and healthcare, '}
                <em className="text-brand">working together.</em>
              </>
            }
            image={{
              src: '/images/home-care-team.jpg',
              alt: 'A nurse and a support professional reviewing a medication organiser with an older woman in her living room',
            }}
          >
            <p className="text-lead">
              Akansoh Health Services supports individuals with intellectual and
              developmental disabilities through compassionate, personalized care that
              enhances quality of life and fosters independence.
            </p>
            <p>
              Our team of dedicated professionals offers homemaker/chore, companion, shift
              nursing, community participation, transportation and respite services —
              tailored to each person’s unique needs. Our vision is a continuum of support
              services in every community we serve.
            </p>
            <div className="pt-3">
              <Button href="/about" variant="secondary" arrow>
                About Akansoh
              </Button>
            </div>
          </FeatureSplit>
        </div>
      </section>

      <section
        aria-labelledby="testimonials-heading"
        className="border-t border-line section-y"
      >
        <div className="container-page">
          <SectionIntro
            id="testimonials-heading"
            eyebrow="Client feedback"
            title={
              <>
                In their <em className="text-brand">own words.</em>
              </>
            }
            description="What individuals and families have shared about their experience with Akansoh Health Services."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <Reveal className="h-full lg:col-span-7">
              <TestimonialCard testimonial={featured} featured />
            </Reveal>
            <div className="grid gap-5 lg:col-span-5">
              {others.slice(0, 2).map((t, i) => (
                <Reveal key={t.name} delay={0.08 * (i + 1)} className="h-full">
                  <TestimonialCard testimonial={t} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
