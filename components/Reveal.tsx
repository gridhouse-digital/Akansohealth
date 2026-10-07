'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

// Content is visible in the server HTML; only elements still below the fold after
// hydration are hidden and then revealed on scroll, so no-JS / slow-JS users see everything.
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.dataset.reveal = 'pending'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.reveal = 'in'
        io.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      delete el.dataset.reveal
    }
  }, [])

  const style = {
    '--reveal-y': `${y}px`,
    '--reveal-delay': `${delay}s`,
  } as CSSProperties

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  )
}
