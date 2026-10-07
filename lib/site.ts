export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.akansohhealthservices.com'
).replace(/\/$/, '')

export const site = {
  name: 'Akansoh Health Services',
  shortName: 'Akansoh',
  tagline: 'People | Purpose | Possibility',
  description:
    'Akansoh Health Services provides compassionate, person-centered support — companion services, homemaker/chore, transportation, community participation support, shift nursing and respite care — that helps individuals live independently and with dignity.',
  phones: [
    { label: '(347) 822-7070', href: 'tel:+13478227070', e164: '+13478227070' },
    { label: '(267) 370-1956', href: 'tel:+12673701956', e164: '+12673701956' },
  ],
  email: 'info@akansohservices.com',
  address: {
    street: '4615 Louise Saint Claire Dr',
    city: 'Doylestown',
    region: 'PA',
    postalCode: '18902',
    country: 'US',
  },
  hours: {
    label: 'Mon – Sat, 8:00 am – 8:00 pm ET',
    short: 'Mon–Sat · 8am–8pm ET',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '20:00',
  },
  jotformUrl: process.env.NEXT_PUBLIC_JOTFORM_URL || '',
} as const

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`

export const primaryPhone = site.phones[0]
export const primaryEmail = site.email

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const
