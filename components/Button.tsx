import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'
type Size = 'md' | 'lg'

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.005em] transition-[background-color,border-color,color,box-shadow] duration-300 ease-expo disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-sm hover:bg-brand-hover hover:shadow-md',
  secondary:
    'border border-line-strong bg-surface text-ink hover:border-brand hover:text-brand',
  ghost: 'px-0! text-brand hover:text-brand-hover underline-offset-4',
  light: 'bg-on-deep text-deep hover:bg-white',
  'outline-light':
    'border border-white/30 text-on-deep hover:border-white/60 hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-[0.9375rem]',
  lg: 'min-h-13 px-7 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  arrow?: boolean
  icon?: ReactNode
  className?: string
  children: ReactNode
}

function Inner({
  children,
  arrow,
  icon,
}: Pick<CommonProps, 'children' | 'arrow' | 'icon'>) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="ease-expo size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  )
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  arrow,
  icon,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    'href' | 'className'
  >) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const isExternal = /^(https?:|mailto:|tel:)/.test(href)
  if (isExternal) {
    return (
      <a href={href} className={classes} {...(rest as ComponentProps<'a'>)}>
        <Inner arrow={arrow} icon={icon}>
          {children}
        </Inner>
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </Link>
  )
}

export function SubmitButton({
  variant = 'primary',
  size = 'lg',
  arrow,
  icon,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </button>
  )
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group/link text-brand hover:text-brand-hover inline-flex items-center gap-2 text-[0.9375rem] font-semibold transition-colors',
        className,
      )}
    >
      <span className="ease-expo bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowRight
        aria-hidden
        className="ease-expo size-4 transition-transform duration-300 group-hover/link:translate-x-1"
      />
    </Link>
  )
}
