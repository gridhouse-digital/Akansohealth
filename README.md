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

| Variable                          | Required | Purpose                                                                                                                                                                       |
| --------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Prod     | Canonical URLs, sitemap, OG. Defaults to `https://akansohealth.com`                                                                                                           |
| `RESEND_API_KEY`                  | For form | Resend API key. If this or `CONTACT_FROM_EMAIL` is empty, the form shows a prefilled email/phone fallback instead of sending                                                  |
| `CONTACT_FROM_EMAIL`              | For form | From address, e.g. `Akanso Health Website <website@send.akansohealth.com>`. The domain must be verified in Resend. Leave open/click tracking off                              |
| `CONTACT_TO_EMAIL`                | Optional | Inbox that receives callback requests. Defaults to `info@akansohealth.com`                                                                                                    |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  | Optional | Cloudflare Turnstile site key. Inlined at build time, so redeploy after changing it. Verification runs only when this and the secret are both set                             |
| `TURNSTILE_SECRET_KEY`            | Optional | Turnstile secret. Server-side siteverify. If either Turnstile key is empty, the check is skipped                                                                              |
| `TURNSTILE_HOSTNAMES`             | Optional | Comma-separated hostnames the siteverify response must match. Leave empty on Preview. Do not include `localhost` in Production                                                |
| `NEXT_PUBLIC_JOTFORM_URL`         | Optional | Shows a "Prefer our full intake form?" card on `/contact` linking to the client's Jotform                                                                                     |
| `NEXT_PUBLIC_JOTFORM_CAREERS_URL` | Optional | Jotform application form embedded (iframe) on `/careers`. If unset, a "coming soon" card with phone/email shows instead. Pages are prerendered, so redeploy after changing it |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | Optional | Loads GA4 when set                                                                                                                                                            |

The contact form collects a name, phone, email, optional callback window, and who the person is. It does not ask for a message or a service. Submissions are a branded HTML email plus a plain-text version (reply-to is the submitter). Links are the logo, a tel link, a mailto link, and the contact page — not tracking redirects. Each submission logs `contact form` with a submission id and a reason (`ok`, `invalid`, `not_configured`, `rate_limited`, `honeypot`, `turnstile`, `resend_failure`). The log line does not include a name, phone, or email.

Spam controls: an off-screen `hp_leave_blank` honeypot (ignored when empty or when it repeats another field, so browser autofill does not drop a real request), Turnstile when both keys are set, and a best-effort in-memory limit of 8 requests per 10 minutes per IP. That limit lives in the serverless instance, so it resets on cold start and is not shared across instances. For a hard limit, use a Vercel Firewall rate-limit rule or a shared store such as Upstash Redis.

`/contact` stays static. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is read in the browser bundle, so a new site key needs a redeploy. `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` are read when the form is submitted.

## Where things live

- `lib/site.ts` — business name, phones, emails, address, hours, nav
- `lib/services.ts` — the six services (drives home grid, `/services`, `/services/[slug]`, footer, sitemap, JSON-LD)
- `lib/testimonials.ts` — testimonials (real, from the previous site)
- `lib/seo.ts` — page metadata + JSON-LD helpers
- `app/globals.css` — design tokens
- `docs/` — content audit, design system, image brief, screenshots

## Redirects

Legacy `.html` URLs (`/index.html`, `/about.html`, `/services.html`, `/contact.html`) permanently redirect to the new routes (`next.config.ts`).
