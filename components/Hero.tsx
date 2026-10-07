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
          <p className="text-eyebrow text-gold-ink flex flex-wrap items-center gap-x-3 gap-y-2 font-bold uppercase">
            <span>Compassionate</span>
            <span aria-hidden className="bg-gold size-1 rounded-full" />
            <span>Person-Centered</span>
            <span aria-hidden className="bg-gold size-1 rounded-full" />
            <span>Community Focused</span>
          </p>
          <h1 id="hero-heading" className="text-display text-ink mt-7">
            Compassionate support.{' '}
            <em className="text-brand block font-[380] italic">
              Meaningful independence.
            </em>
          </h1>
          <p className="text-lead text-ink-soft mt-8 max-w-xl">
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
            className="border-line text-ink-soft mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6 text-[0.9375rem]"
          >
            <a
              href={primaryPhone.href}
              className="hover:text-brand inline-flex min-h-11 items-center gap-2.5"
            >
              <Phone aria-hidden className="text-gold-ink size-4" />
              Call {primaryPhone.label}
            </a>
            <span className="inline-flex min-h-11 items-center gap-2.5">
              <Clock aria-hidden className="text-gold-ink size-4" />
              {site.hours.label}
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.05} y={24} className="relative lg:col-span-6 lg:pl-6">
          <div className="relative mx-auto max-w-xl lg:max-w-none">
            <div className="arch bg-bg-alt relative ml-auto aspect-[4/5] w-[82%] overflow-hidden shadow-lg sm:w-[76%]">
              <Image
                src="/images/companionship-conversation.jpg"
                alt="A support professional sharing a warm conversation with an older woman outdoors"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover object-[30%_center]"
              />
            </div>
            <div className="border-bg absolute bottom-[8%] left-0 w-[44%] overflow-hidden rounded-lg border-[6px] shadow-lg sm:border-8">
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
            <div className="border-line bg-surface/95 absolute top-[6%] left-[2%] hidden max-w-[15rem] rounded-lg border p-5 shadow-md sm:block">
              <p className="font-display text-ink text-xl leading-snug">
                Compassionate care for you.
              </p>
              <p className="text-gold-ink mt-3 text-[0.6875rem] font-bold tracking-[0.16em] uppercase">
                People · Purpose · Possibility
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
