import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ImagePlaceholder({
  icon: Icon,
  label,
  tone = 'sand',
  className,
}: {
  icon: LucideIcon
  label: string
  tone?: 'sand' | 'deep'
  className?: string
}) {
  const deep = tone === 'deep'
  return (
    <div
      role="img"
      aria-label={label}
      data-placeholder
      className={cn(
        'relative isolate flex items-center justify-center overflow-hidden',
        deep
          ? 'bg-deep bg-[radial-gradient(ellipse_at_30%_20%,rgb(197_150_78/0.16),transparent_60%)]'
          : 'bg-bg-alt bg-[repeating-linear-gradient(135deg,transparent_0_22px,rgb(197_150_78/0.08)_22px_23px)]',
        className,
      )}
    >
      <Image
        src="/brand/akansoh-mark.png"
        alt=""
        aria-hidden
        width={582}
        height={577}
        className={cn(
          'pointer-events-none absolute -right-[8%] -bottom-[18%] -z-10 w-[55%] max-w-md',
          deep ? 'opacity-[0.08]' : 'opacity-[0.06]',
        )}
      />
      <span
        className={cn(
          'flex size-24 items-center justify-center rounded-full border',
          deep
            ? 'border-gold/40 text-gold bg-white/5'
            : 'border-gold/40 bg-surface/70 text-brand',
        )}
      >
        <Icon aria-hidden className="size-10" strokeWidth={1.4} />
      </span>
    </div>
  )
}
