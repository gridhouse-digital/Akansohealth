import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode
  tone?: 'default' | 'light'
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-eyebrow flex items-center gap-3 font-bold uppercase',
        tone === 'light' ? 'text-gold' : 'text-gold-ink',
        className,
      )}
    >
      <span aria-hidden className="h-px w-7 shrink-0 bg-current opacity-70" />
      {children}
    </p>
  )
}
