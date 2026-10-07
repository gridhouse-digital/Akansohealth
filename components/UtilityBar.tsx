import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { primaryEmail, primaryPhone, site } from '@/lib/site'

export function UtilityBar() {
  return (
    <div className="on-deep bg-deep text-on-deep-muted">
      <div className="container-page flex h-10 items-center justify-between gap-6 text-[0.8125rem]">
        <p className="hidden items-center gap-2 md:flex">
          <MapPin aria-hidden className="text-gold size-3.5" />
          Based in {site.address.city}, {site.address.region}
          <span aria-hidden className="mx-2 h-3 w-px bg-white/20" />
          <Clock aria-hidden className="text-gold size-3.5" />
          {site.hours.short}
        </p>
        <div className="flex w-full items-center justify-between gap-5 md:w-auto md:justify-end">
          <a
            href={primaryPhone.href}
            className="inline-flex min-h-10 items-center gap-2 transition-colors hover:text-white"
          >
            <Phone aria-hidden className="text-gold size-3.5" />
            {primaryPhone.label}
          </a>
          <a
            href={`mailto:${primaryEmail}`}
            className="inline-flex min-h-10 items-center gap-2 transition-colors hover:text-white"
          >
            <Mail aria-hidden className="text-gold size-3.5" />
            <span className="xs:inline hidden">{primaryEmail}</span>
            <span className="xs:hidden">Email us</span>
          </a>
        </div>
      </div>
    </div>
  )
}
