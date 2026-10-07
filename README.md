# Akansoh Health Services — website

Next.js (App Router) + TypeScript + Tailwind v4. Static pages, one route handler for the contact form. Targets Vercel.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

| Script                            |                                     |
| --------------------------------- | ----------------------------------- |
| `npm run dev`                     | Dev server                          |
| `npm run build` / `npm start`     | Production build / serve            |
| `npm run lint`                    | ESLint                              |
| `npm run typecheck`               | `tsc --noEmit`                      |
| `npm run format` / `format:check` | Prettier (+ Tailwind class sorting) |

## Environment

| Variable                        | Required | Purpose                                                                                                                                                                |
| ------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Prod     | Canonical URLs, sitemap, OG. Defaults to `https://www.akansohhealthservices.com`                                                                                       |
| `CONTACT_FORM_ENDPOINT`         | For form | URL the contact form forwards JSON to (e.g. Formspree, FormSubmit AJAX, Basin, Zapier/Make webhook). If unset, the form shows a prefilled email/phone fallback instead |
| `CONTACT_FORM_TOKEN`            | Optional | Sent as `Authorization: Bearer …` to the endpoint                                                                                                                      |
| `NEXT_PUBLIC_JOTFORM_URL`       | Optional | Shows a "Prefer our full intake form?" card on `/contact` linking to the client's Jotform                                                                              |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Loads GA4 when set                                                                                                                                                     |

## Where things live

- `lib/site.ts` — business name, phones, emails, address, hours, nav
- `lib/services.ts` — the six services (drives home grid, `/services`, `/services/[slug]`, footer, sitemap, JSON-LD)
- `lib/testimonials.ts` — testimonials (real, from the previous site)
- `lib/seo.ts` — page metadata + JSON-LD helpers
- `app/globals.css` — design tokens
- `docs/` — content audit, design system, image brief, screenshots

## Redirects

Legacy `.html` URLs (`/index.html`, `/about.html`, `/services.html`, `/contact.html`) permanently redirect to the new routes (`next.config.ts`).
