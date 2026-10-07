import Image from 'next/image'
import type { Testimonial } from '@/lib/testimonials'
import { cn, initials } from '@/lib/utils'

export function TestimonialCard({
  testimonial,
  featured,
  className,
}: {
  testimonial: Testimonial
  featured?: boolean
  className?: string
}) {
  return (
    <figure
      className={cn(
        'relative isolate flex h-full flex-col justify-between overflow-hidden rounded-lg border p-7 sm:p-9',
        featured
          ? 'on-deep border-deep bg-deep text-on-deep lg:p-12'
          : 'border-line bg-surface',
        className,
      )}
    >
      {featured && (
        <Image
          src="/brand/akansoh-mark.png"
          alt=""
          aria-hidden
          width={582}
          height={577}
          className="pointer-events-none absolute -right-12 -bottom-16 -z-10 w-72 opacity-[0.07]"
        />
      )}
      <div>
        <span
          aria-hidden
          className={cn(
            'block font-display text-[4.5rem] leading-[0.6]',
            featured ? 'text-gold' : 'text-gold/70',
          )}
        >
          “
        </span>
        <blockquote
          className={cn(
            'mt-4 font-display',
            featured
              ? 'text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.25] text-on-deep'
              : 'text-[1.3125rem] leading-snug text-ink',
          )}
        >
          <p>{testimonial.quote}</p>
        </blockquote>
      </div>
      <figcaption className="mt-10 flex items-center gap-4">
        <span
          aria-hidden
          className={cn(
            'flex size-11 items-center justify-center rounded-full text-sm font-bold',
            featured ? 'bg-white/10 text-gold' : 'bg-bg-alt text-brand',
          )}
        >
          {initials(testimonial.name)}
        </span>
        <span className="grid">
          <span className={cn('font-semibold', featured ? 'text-on-deep' : 'text-ink')}>
            {testimonial.name}
          </span>
          <span
            className={cn('text-sm', featured ? 'text-on-deep-muted' : 'text-ink-soft')}
          >
            Client feedback
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
