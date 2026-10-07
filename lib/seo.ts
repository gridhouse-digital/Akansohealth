import type { Metadata } from 'next'
import { services } from './services'
import { site, siteUrl } from './site'

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = path === '/' ? siteUrl : `${siteUrl}${path}`
  const images = [
    { url: image ?? '/og-image.jpg', width: 1200, height: 630, alt: site.name },
  ]
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title,
      description,
      locale: 'en_US',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((i) => i.url),
    },
  }
}

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${siteUrl}/#business`,
    name: site.name,
    description: site.description,
    url: siteUrl,
    logo: `${siteUrl}/brand/akansoh-logo-600.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: site.phones.map((p) => p.e164),
    email: site.emails[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: `${siteUrl}/services/${s.slug}`,
        },
      })),
    },
  }
}

export function serviceJsonLd(slug: string) {
  const s = services.find((x) => x.slug === slug)
  if (!s) return null
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: s.name,
        description: s.summary,
        url: `${siteUrl}/services/${s.slug}`,
        provider: { '@id': `${siteUrl}/#business` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${siteUrl}/services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: s.name,
            item: `${siteUrl}/services/${s.slug}`,
          },
        ],
      },
    ],
  }
}
