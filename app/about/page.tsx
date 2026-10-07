import Image from 'next/image'
import { Compass, HandHeart, Network, Sprout, UsersRound } from 'lucide-react'
import { Button } from '@/components/Button'
import { CTASection } from '@/components/CTASection'
import { Eyebrow } from '@/components/Eyebrow'
import { FeatureSplit } from '@/components/FeatureSplit'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionIntro } from '@/components/SectionIntro'
import { TestimonialCard } from '@/components/TestimonialCard'
import { ValueCard } from '@/components/ValueCard'
import { pageMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { testimonials } from '@/lib/testimonials'

export const metadata = pageMetadata({
  title: 'About Us',
  description:
    'Akansoh Health Services supports individuals with intellectual and developmental disabilities to achieve greater independence through compassionate, person-centered care.',
  path: '/about',
})

const philosophy = [
  {
    icon: Compass,
    title: 'Personalized care',
    text: 'We tailor our services to the unique needs of each individual, creating personal paths to wellness and independence.',
  },
  {
    icon: Sprout,
    title: 'Choice and self-determination',
    text: 'We believe individuals have the right to choose their own destiny — and we support the decisions they make about their lives.',
  },
  {
    icon: Network,
    title: 'A cohesive support system',
    text: 'People are better equipped when they are anchored in a support system that works together — individuals, families, caregivers and our team.',
  },
  {
    icon: UsersRound,
    title: 'Community integration',
    text: 'We encourage social participation and community involvement, helping individuals stay connected and engaged with their surroundings.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Akansoh"
        title={
          <>
            A healthy community, <em className="text-brand">one individual at a time.</em>
          </>
        }
        description="At Akansoh Health Services, we combine compassion and healthcare to support individuals with intellectual and developmental disabilities — helping them live independently, with dignity and on their own terms."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        aside={
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden arch bg-bg-alt shadow-md lg:ml-auto">
            <Image
              src="/images/about-hero.jpg"
              alt="A young man and his support professional chatting on the front steps of a small-town library, both holding books"
              fill
              priority
              sizes="(min-width: 24rem) 24rem, 100vw"
              className="object-cover"
            />
          </div>
        }
      />

      <section aria-labelledby="story-heading" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>What we’re about</Eyebrow>
            <h2 id="story-heading" className="mt-5 text-h2 text-ink">
              {'Support that enhances quality of life — and '}
              <em className="text-brand">fosters independence.</em>
            </h2>
          </Reveal>
          <Reveal
            delay={0.08}
            className="space-y-6 text-ink-soft lg:col-span-6 lg:col-start-7 lg:pt-12"
          >
            <p className="text-lead">
              Akansoh Health Services is committed to improving the lives of individuals
              with intellectual and developmental disabilities (IDD) through
              compassionate, thoughtful and personalized care.
            </p>
            <p>
              Our goal is to empower the people we serve with comprehensive support that
              enhances their quality of life and builds independence. Our team of skilled,
              dedicated professionals is passionate about making a difference, and every
              service we offer is tailored to the person receiving it.
            </p>
            <p>
              Our holistic approach brings together homemaker/chore support, companion
              services, shift nursing, community participation support, transportation and
              respite care — along with life skills support — so that everyone receives
              the care they deserve.
            </p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {services.map((s) => (
                <li
                  key={s.slug}
                  className="rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm text-ink"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="mission-heading" className="bg-bg-alt section-y">
        <div className="container-page">
          <h2 id="mission-heading" className="sr-only">
            Our mission and vision
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal className="on-deep relative isolate overflow-hidden rounded-xl bg-deep p-8 sm:p-12">
              <Image
                src="/brand/akansoh-mark.png"
                alt=""
                aria-hidden
                width={582}
                height={577}
                className="pointer-events-none absolute -right-16 -bottom-20 -z-10 w-80 opacity-[0.07]"
              />
              <Eyebrow tone="light">Our mission</Eyebrow>
              <p className="mt-8 font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] leading-[1.25] text-on-deep">
                To support individuals with developmental disabilities to achieve greater
                independence and function at their highest potential.
              </p>
              <p className="mt-8 text-on-deep-muted">
                We are dedicated to improving the lives of individuals who are vulnerable
                and underserved. We provide the support people need, knowing they are
                better equipped when anchored in a cohesive support system — and we
                believe every individual has the right to choose their own destiny.
              </p>
            </Reveal>
            <Reveal
              delay={0.08}
              className="rounded-xl border border-line bg-surface p-8 sm:p-12"
            >
              <Eyebrow>Our vision</Eyebrow>
              <p className="mt-8 font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] leading-[1.25] text-ink">
                To foster a continuum of support services in every community we serve.
              </p>
              <p className="mt-8 text-ink-soft">
                We aim to be the region’s provider of choice for individuals and families
                seeking services — and the region’s employer of choice for qualified,
                committed professionals.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="philosophy-heading" className="section-y">
        <div className="container-page">
          <SectionIntro
            id="philosophy-heading"
            eyebrow="Our person-centered philosophy"
            title={
              <>
                The person comes first. <em className="text-brand">Always.</em>
              </>
            }
            description="Person-centered care means the individual — their needs, preferences and goals — shapes the support they receive. It guides everything we do."
          />
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <ValueCard icon={p.icon} title={p.title}>
                  {p.text}
                </ValueCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="team-heading" className="border-t border-line section-y">
        <div className="container-page">
          <FeatureSplit
            headingId="team-heading"
            eyebrow="Our team"
            title={
              <>
                Experienced, caring people <em className="text-brand">who show up.</em>
              </>
            }
            image={{
              src: '/images/about-team.jpg',
              alt: 'A support professional being welcomed at the front door by a mother and her adult son',
            }}
          >
            <p className="text-lead">
              Our experienced professionals include registered nurses and skilled
              caregivers who provide exceptional care with compassion and expertise.
            </p>
            <p>
              Whether it’s help around the home, a ride to an appointment, a shift of
              skilled nursing or an afternoon out in the community, our team brings the
              same respect, patience and attention to every visit.
            </p>
            <div className="flex items-center gap-3 pt-2 text-ink">
              <HandHeart aria-hidden className="size-5 text-gold-ink" />
              <span className="font-semibold">
                Compassionate. Professional. Person-centered.
              </span>
            </div>
            <div className="pt-2">
              <Button href="/services" variant="secondary" arrow>
                Explore our services
              </Button>
            </div>
          </FeatureSplit>
        </div>
      </section>

      <section
        aria-labelledby="about-testimonials-heading"
        className="bg-bg-alt section-y"
      >
        <div className="container-page">
          <SectionIntro
            id="about-testimonials-heading"
            eyebrow="Client feedback"
            title="Kindness and professionalism, every step of the way."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {testimonials.slice(3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="h-full">
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start your care journey with us."
        description="Tell us about the support you or your loved one needs. We’ll listen, answer your questions and help you explore the right services."
      />
    </>
  )
}
