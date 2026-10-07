import { getService } from '@/lib/services'
import { Reveal } from './Reveal'
import { ServiceCard } from './ServiceCard'

const layout = [
  { slug: 'companion-services', variant: 'feature', cell: 'md:col-span-6 lg:col-span-7' },
  { slug: 'homemaker-chore', variant: 'compact', cell: '' },
  { slug: 'transportation-services', variant: 'compact', cell: '' },
  {
    slug: 'community-participation-support',
    variant: 'tint',
    cell: 'md:col-span-3 lg:col-span-4',
  },
  { slug: 'shift-nursing', variant: 'deep', cell: 'md:col-span-3 lg:col-span-4' },
  { slug: 'respite-care', variant: 'image', cell: 'md:col-span-6 lg:col-span-4' },
] as const

export function ServiceGrid() {
  const items = layout.map((l, i) => ({ ...l, index: i, service: getService(l.slug)! }))
  const [feature, a, b, ...rest] = items

  return (
    <div className="grid gap-5 md:grid-cols-6 lg:grid-cols-12">
      <Reveal className={`h-full ${feature.cell}`}>
        <ServiceCard service={feature.service} variant={feature.variant} index={0} />
      </Reveal>
      <div className="grid gap-5 md:col-span-6 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
        {[a, b].map((item, i) => (
          <Reveal key={item.slug} delay={0.06 * (i + 1)} className="h-full">
            <ServiceCard
              service={item.service}
              variant={item.variant}
              index={item.index}
            />
          </Reveal>
        ))}
      </div>
      {rest.map((item, i) => (
        <Reveal key={item.slug} delay={0.06 * i} className={`h-full ${item.cell}`}>
          <ServiceCard service={item.service} variant={item.variant} index={item.index} />
        </Reveal>
      ))}
    </div>
  )
}
