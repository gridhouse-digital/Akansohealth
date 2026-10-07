import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

type SectionIntroProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  aside?: ReactNode
  layout?: 'split' | 'stacked' | 'center'
  tone?: 'default' | 'light'
  id?: string
  className?: string
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  aside,
  layout = 'split',
  tone = 'default',
  id,
  className,
}: SectionIntroProps) {
  const light = tone === 'light'
  const split = layout === 'split'
  const lead = cn('text-lead', light ? 'text-on-deep-muted' : 'text-ink-soft')

  return (
    <Reveal
      className={cn(
        split && 'grid gap-6 md:grid-cols-12 md:items-end md:gap-10',
        layout === 'center' && 'mx-auto max-w-3xl text-center',
        layout === 'stacked' && 'max-w-3xl',
        className,
      )}
    >
      <div className={cn(split && 'md:col-span-7')}>
        <Eyebrow tone={tone} className={cn(layout === 'center' && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className={cn('mt-5 text-h2', light ? 'text-on-deep' : 'text-ink')}>
          {title}
        </h2>
        {!split && description && (
          <p className={cn(lead, 'mt-6', layout === 'center' && 'mx-auto max-w-2xl')}>
            {description}
          </p>
        )}
      </div>
      {split && (description || aside) && (
        <div className="md:col-span-5 md:col-start-8 md:pb-2">
          {description && <p className={lead}>{description}</p>}
          {aside && <div className="mt-6">{aside}</div>}
        </div>
      )}
    </Reveal>
  )
}
