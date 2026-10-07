export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function isActive(pathname: string, href: string) {
  return href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`)
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
