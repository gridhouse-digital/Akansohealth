'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { mainNav, primaryEmail, primaryPhone, site } from '@/lib/site'
import { services } from '@/lib/services'
import { cn, isActive } from '@/lib/utils'

const focusable =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

const noop = () => () => {}

export function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>(focusable)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(focusable))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="border-line-strong text-ink hover:border-brand hover:text-brand inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <motion.div
                  aria-hidden
                  className="bg-deep/50 absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  onClick={close}
                />
                <motion.div
                  ref={panelRef}
                  id="mobile-nav"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site menu"
                  className="bg-bg absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto shadow-lg"
                  initial={reduce ? { opacity: 0 } : { x: '100%' }}
                  animate={reduce ? { opacity: 1 } : { x: 0 }}
                  exit={reduce ? { opacity: 0 } : { x: '100%' }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-line flex h-(--header-h) items-center justify-between border-b px-5">
                    <span className="text-eyebrow text-gold-ink font-bold uppercase">
                      Menu
                    </span>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close menu"
                      className="border-line-strong text-ink hover:border-brand hover:text-brand inline-flex size-11 items-center justify-center rounded-full border transition-colors"
                    >
                      <X aria-hidden className="size-5" />
                    </button>
                  </div>
                  <nav aria-label="Mobile" className="px-5 pt-4">
                    <ul>
                      {mainNav.map((item) => {
                        const active = isActive(pathname, item.href)
                        return (
                          <li key={item.href} className="border-line border-b">
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'font-display flex min-h-16 items-center justify-between text-[1.75rem] leading-none',
                                active ? 'text-brand' : 'text-ink',
                              )}
                            >
                              {item.label}
                              {active && (
                                <span
                                  aria-hidden
                                  className="bg-gold size-2 rounded-full"
                                />
                              )}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                  <div className="px-5 pt-8">
                    <p className="text-eyebrow text-gold-ink font-bold uppercase">
                      Services
                    </p>
                    <ul className="mt-3 grid gap-0.5">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="text-ink-soft hover:text-brand flex min-h-11 items-center text-[0.9375rem]"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-line bg-surface-muted mt-auto grid gap-3 border-t px-5 py-6">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="bg-brand inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold text-white"
                    >
                      Request Services
                    </Link>
                    <a
                      href={primaryPhone.href}
                      className="text-ink inline-flex min-h-11 items-center gap-3"
                    >
                      <Phone aria-hidden className="text-gold-ink size-4" />
                      {primaryPhone.label}
                    </a>
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="text-ink inline-flex min-h-11 items-center gap-3 break-all"
                    >
                      <Mail aria-hidden className="text-gold-ink size-4 shrink-0" />
                      {primaryEmail}
                    </a>
                    <p className="text-ink-soft text-sm">{site.hours.label}</p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
