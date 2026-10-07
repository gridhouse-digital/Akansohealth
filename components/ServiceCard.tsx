import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import type { Service } from '@/lib/services'
import { cn } from '@/lib/utils'

type Variant = 'feature' | 'image' | 'compact' | 'tint' | 'deep'

export function ServiceCard({
  service,
  variant = 'compact',
  index,
  className,
}: {
  service: Service
  variant?: Variant
  index?: number
  className?: string
}) {
  const Icon = service.icon
  const deep = variant === 'deep'
  const hasImage = (variant === 'feature' || variant === 'image') && service.image

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border transition-[border-color,box-shadow,transform] duration-500 ease-expo hover:-translate-y-1',
        deep
          ? 'on-deep border-deep bg-deep text-on-deep hover:shadow-lg'
          : variant === 'tint'
            ? 'border-line-strong/60 bg-bg-alt hover:border-line-strong hover:shadow-md'
            : 'border-line bg-surface hover:border-line-strong hover:shadow-md',
        variant === 'feature' && 'md:flex-row',
        className,
      )}
    >
      {hasImage && service.image && (
        <div
          className={cn(
            'relative overflow-hidden bg-bg-alt',
            variant === 'feature'
              ? 'aspect-[4/3] md:aspect-auto md:w-[52%]'
              : 'aspect-[16/10]',
          )}
        >
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes={
              variant === 'feature'
                ? '(min-width: 768px) 32vw, 100vw'
                : '(min-width: 768px) 30vw, 100vw'
            }
            className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div
        className={cn(
          'flex flex-1 flex-col p-6 sm:p-7',
          variant === 'feature' && 'md:p-9 lg:p-10',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              'flex size-12 items-center justify-center rounded-md',
              deep
                ? 'bg-white/8 text-gold'
                : variant === 'tint'
                  ? 'bg-surface text-brand'
                  : 'bg-bg-alt text-brand',
            )}
          >
            <Icon aria-hidden className="size-5.5" strokeWidth={1.6} />
          </span>
          {typeof index === 'number' && (
            <span
              className={cn(
                'font-display text-sm tabular-nums',
                deep ? 'text-on-deep-muted' : 'text-ink-soft/70',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>
        <h3
          className={cn(
            'mt-6 leading-tight',
            variant === 'feature' ? 'text-h3' : 'text-[1.5rem]',
            deep ? 'text-on-deep' : 'text-ink',
          )}
        >
          {service.name}
        </h3>
        <p
          className={cn(
            'mt-3 text-[0.9375rem] leading-relaxed',
            deep ? 'text-on-deep-muted' : 'text-ink-soft',
          )}
        >
          {service.summary}
        </p>
        {(variant === 'tint' || deep) && (
          <ul
            className={cn(
              'mt-6 grid gap-2.5 border-t pt-6 text-[0.875rem]',
              deep
                ? 'border-white/10 text-on-deep-muted'
                : 'border-line-strong/60 text-ink-soft',
            )}
          >
            {service.includes.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check
                  aria-hidden
                  className={cn(
                    'mt-0.5 size-4 shrink-0',
                    deep ? 'text-gold' : 'text-brand',
                  )}
                />
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-7">
          <Link
            href={`/services/${service.slug}`}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold after:absolute after:inset-0 after:content-[""]',
              deep ? 'text-gold' : 'text-brand',
            )}
          >
            Learn more<span className="sr-only"> about {service.name}</span>
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}
