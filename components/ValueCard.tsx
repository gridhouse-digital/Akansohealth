import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ValueCard({
  icon: Icon,
  title,
  children,
  tone = 'default',
  headingLevel = 'h3',
  className,
}: {
  icon: LucideIcon
  title: string
  children: React.ReactNode
  tone?: 'default' | 'light'
  headingLevel?: 'h3' | 'h4'
  className?: string
}) {
  const light = tone === 'light'
  const Heading = headingLevel
  return (
    <div
      className={cn(
        'flex h-full flex-col border-t pt-7',
        light ? 'border-white/15' : 'border-line-strong',
        className,
      )}
    >
      <Icon
        aria-hidden
        strokeWidth={1.5}
        className={cn('size-7', light ? 'text-gold' : 'text-brand')}
      />
      <Heading
        className={cn(
          'font-display mt-6 text-[1.5rem] leading-tight',
          light ? 'text-on-deep' : 'text-ink',
        )}
      >
        {title}
      </Heading>
      <p
        className={cn(
          'mt-3 text-[0.9375rem] leading-relaxed',
          light ? 'text-on-deep-muted' : 'text-ink-soft',
        )}
      >
        {children}
      </p>
    </div>
  )
}
