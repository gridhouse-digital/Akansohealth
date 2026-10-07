import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  breadcrumbs?: Crumb[]
  children?: ReactNode
  aside?: ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  aside,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-page pt-12 pb-16 md:pt-16 md:pb-24">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
              {breadcrumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-h1 text-ink">{title}</h1>
            {description && (
              <p className="mt-7 max-w-2xl text-lead text-ink-soft">{description}</p>
            )}
            {children && <div className="mt-9">{children}</div>}
          </Reveal>
          {aside && (
            <Reveal delay={0.1} className="lg:col-span-5">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
