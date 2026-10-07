import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  priority,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Akansoh Health Services — home"
      className={cn('inline-flex shrink-0 items-center', className)}
    >
      <Image
        src="/brand/akansoh-lockup.png"
        alt="Akansoh Health Services"
        width={900}
        height={217}
        priority={priority}
        sizes="200px"
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  )
}
