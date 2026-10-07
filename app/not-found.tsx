import type { Metadata } from 'next'
import { Button } from '@/components/Button'
import { Eyebrow } from '@/components/Eyebrow'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-6 text-h1 text-ink">We couldn’t find that page.</h1>
        <p className="mt-6 text-lead text-ink-soft">
          The page may have moved. Let’s get you back to something helpful.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/services" variant="secondary">
            Explore services
          </Button>
        </div>
      </div>
    </section>
  )
}
