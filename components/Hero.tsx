import Image from 'next/image'
import { Clock, Phone } from 'lucide-react'
import { primaryPhone, site } from '@/lib/site'
import { Button } from './Button'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="container-page grid gap-14 pt-10 pb-20 md:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-28">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-eyebrow font-bold text-gold-ink uppercase">
            <span>Compassionate</span>
            <span aria-hidden className="size-1 rounded-full bg-gold" />
            <span>Person-Centered</span>
            <span aria-hidden className="size-1 rounded-full bg-gold" />
            <span>Community Focused</span>
          </p>
          <h1 id="hero-heading" className="mt-7 text-display text-ink">
            Compassionate support.{' '}
            <em className="block font-[380] text-brand italic">
              Meaningful independence.
            </em>
          </h1>
          <p className="mt-8 max-w-xl text-lead text-ink-soft">
            At Akansoh Health Services, we combine compassion and healthcare to build a
            healthy community, one individual at a time — with person-centered support
            that helps people live independently and with dignity.
          </p>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
            <Button href="/services" size="lg" arrow>
              Explore Our Services
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Contact Us
            </Button>
          </Reveal>
          <Reveal
            delay={0.2}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-[0.9375rem] text-ink-soft"
          >
            <a
              href={primaryPhone.href}
              className="inline-flex min-h-11 items-center gap-2.5 hover:text-brand"
            >
              <Phone aria-hidden className="size-4 text-gold-ink" />
              Call {primaryPhone.label}
            </a>
            <span className="inline-flex min-h-11 items-center gap-2.5">
              <Clock aria-hidden className="size-4 text-gold-ink" />
              {site.hours.label}
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.05} y={24} className="relative lg:col-span-6 lg:pl-6">
          <div className="relative mx-auto max-w-xl lg:max-w-none">
            <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden arch bg-bg-alt shadow-lg sm:w-[76%]">
              <Image
                src="/images/companionship-conversation.jpg"
                alt="A support professional sharing a warm conversation with an older woman outdoors"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover object-[30%_center]"
              />
            </div>
            <div className="absolute bottom-[8%] left-0 w-[44%] overflow-hidden rounded-lg border-[6px] border-bg shadow-lg sm:border-8">
              <div className="relative aspect-square">
                <Image
                  src="/images/daily-living-kitchen.jpg"
                  alt="A woman preparing a meal in her kitchen"
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-[6%] left-[2%] hidden max-w-[15rem] rounded-lg border border-line bg-surface/95 p-5 shadow-md sm:block">
              <p className="font-display text-xl leading-snug text-ink">
                Compassionate care for you.
              </p>
              <p className="mt-3 text-[0.6875rem] font-bold tracking-[0.16em] text-gold-ink uppercase">
                People · Purpose · Possibility
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
