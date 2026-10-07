import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/services', '/careers', '/contact'].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))
  const servicePages = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  return [...pages, ...servicePages]
}
