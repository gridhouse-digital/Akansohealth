import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

type FeatureSplitProps = {
  eyebrow: string
  title: ReactNode
  children: ReactNode
  image?: { src: string; alt: string }
  media?: ReactNode
  reverse?: boolean
  shape?: 'arch' | 'rounded'
  headingId?: string
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export function FeatureSplit({
  eyebrow,
  title,
  children,
  image,
  media,
  reverse,
  shape = 'rounded',
  headingId,
  headingLevel = 'h2',
  className,
}: FeatureSplitProps) {
  const Heading = headingLevel
  return (
    <div className={cn('grid items-center gap-12 lg:grid-cols-12 lg:gap-16', className)}>
      <Reveal
        y={24}
        className={cn(
          'lg:col-span-6',
          reverse ? 'lg:order-2 lg:col-start-7' : 'lg:order-1',
        )}
      >
        {media ??
          (image && (
            <div
              className={cn(
                'bg-bg-alt relative overflow-hidden',
                shape === 'arch'
                  ? 'arch mx-auto aspect-[4/5] max-w-md lg:max-w-none'
                  : 'aspect-[5/4] rounded-xl',
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
      </Reveal>
      <Reveal
        delay={0.08}
        className={cn(
          'lg:col-span-6 xl:col-span-5',
          reverse ? 'lg:order-1' : 'lg:order-2 xl:col-start-8',
        )}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading
          id={headingId}
          className={cn('text-ink mt-5', headingLevel === 'h2' ? 'text-h2' : 'text-h3')}
        >
          {title}
        </Heading>
        <div className="text-ink-soft mt-6 space-y-5">{children}</div>
      </Reveal>
    </div>
  )
}
