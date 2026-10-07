import { getService, type ServiceImage } from '@/lib/services'
import { Reveal } from './Reveal'
import { ServiceCard } from './ServiceCard'

type Cell = {
  slug: string
  variant: 'feature' | 'compact' | 'tint' | 'deep' | 'image'
  cell: string
  image?: ServiceImage
  imageClassName?: string
}

const layout: Cell[] = [
  {
    slug: 'companion-services',
    variant: 'feature',
    cell: 'md:col-span-6 lg:col-span-7',
    image: {
      src: '/images/home-card-companion.jpg',
      alt: 'A support professional and a man laughing together over mugs of coffee at a sunny kitchen window',
    },
    imageClassName: 'object-[50%_35%]',
  },
  { slug: 'homemaker-chore', variant: 'compact', cell: '' },
  { slug: 'transportation-services', variant: 'compact', cell: '' },
  {
    slug: 'community-participation-support',
    variant: 'tint',
    cell: 'md:col-span-3 lg:col-span-4',
  },
  { slug: 'shift-nursing', variant: 'deep', cell: 'md:col-span-3 lg:col-span-4' },
  {
    slug: 'respite-care',
    variant: 'image',
    cell: 'md:col-span-6 lg:col-span-4',
    image: {
      src: '/images/home-card-respite.jpg',
      alt: 'A support professional and a young woman doing a jigsaw puzzle together on the sofa',
    },
  },
]

export function ServiceGrid() {
  const items = layout.map((l, i) => ({ ...l, index: i, service: getService(l.slug)! }))
  const [feature, a, b, ...rest] = items

  return (
    <div className="grid gap-5 md:grid-cols-6 lg:grid-cols-12">
      <Reveal className={`h-full ${feature.cell}`}>
        <ServiceCard
          service={feature.service}
          variant={feature.variant}
          index={0}
          image={feature.image}
          imageClassName={feature.imageClassName}
        />
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
          <ServiceCard
            service={item.service}
            variant={item.variant}
            index={item.index}
            image={item.image}
            imageClassName={item.imageClassName}
          />
        </Reveal>
      ))}
    </div>
  )
}
