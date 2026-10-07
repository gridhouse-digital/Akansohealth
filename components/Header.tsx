'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { mainNav } from '@/lib/site'
import { cn, isActive } from '@/lib/utils'
import { Button } from './Button'
import { Logo } from './Logo'
import { MobileNavigation } from './MobileNavigation'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-line bg-bg/90 shadow-[0_8px_30px_-20px_rgb(20_42_34/0.35)] backdrop-blur-md'
          : 'border-transparent bg-bg',
      )}
    >
      <div className="container-page flex h-(--header-h) items-center justify-between gap-6">
        <Logo priority />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium transition-colors xl:px-4',
                      active ? 'text-brand' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-3 bottom-1.5 h-px origin-left bg-gold transition-transform duration-500 ease-expo xl:inset-x-4',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/contact" arrow>
              Request Services
            </Button>
          </div>
          <MobileNavigation pathname={pathname} />
        </div>
      </div>
    </header>
  )
}
