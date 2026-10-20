# Launch Checklist

Items marked **CLIENT-CONFIRM** block launch until Akansoh confirms them in writing.

## ⚠️ CLIENT-CONFIRM — Domain and email

The live site is `akansohhealthservices.com`, but its published emails use a different domain (`@akansohservices.com`) plus a personal Gmail address. We can't verify ownership of either.

Current build:

- All canonical URLs, sitemap, robots, OpenGraph and JSON-LD use `NEXT_PUBLIC_SITE_URL` (default `https://akansohealth.com`; the owner has said the site will move to `akansohealth.com`).
- The only public email shown is `info@akansohealth.com` (`lib/site.ts → site.email`), per the owner's instruction. Confirm the mailbox exists and the domain's MX records are set up.
- `akansoh937@gmail.com` has been **removed from every rendered page and from structured data**.
- Contact-form delivery uses Resend (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, optional `CONTACT_TO_EMAIL`). The recipient defaults to `info@akansohealth.com`, which is already public on the site. The old FormSubmit form sent to `divinetechpro7@gmail.com` (likely the previous developer) — do not reuse it. The form does not collect a free-text message or a diagnosis.

Please confirm:

1. [ ] Canonical form of the new domain: apex `akansohealth.com` (current default) or `www.akansohealth.com`. Pick one and 301 the other. Also decide whether the old `akansohhealthservices.com` should 301 to the new domain so existing search rankings carry over.
2. [ ] The correct primary public email address — does `info@akansohealth.com` exist and is it monitored?
3. [ ] Whether `akansoh937@gmail.com` should receive anything (form submissions, copies) or stay fully private.
4. [ ] Which inbox should receive contact-form submissions.

## ⚠️ CLIENT-CONFIRM — Testimonials

The five quotes come from the live site, which paired them with stock headshots and full names. Because the quotes describe clients' relatives (e.g. "my father", "my mother"), attributions are now shortened to **first name + last initial** (`lib/testimonials.ts`) and photos are not used.

| #   | Quote (start)                                                               | Shown as  | Original attribution |
| --- | --------------------------------------------------------------------------- | --------- | -------------------- |
| 1   | "Akansoh Health Services transformed my father's daily life…"               | Ramon G.  | Ramon Gonzalez       |
| 2   | "The in-home support we received was exceptional…"                          | Jane E.   | Jane Efomo           |
| 3   | "Akansoh Health Services helped my mother regain her independence…"         | Fatima B. | Fatima Bello         |
| 4   | "I can't thank Akansoh enough for their kindness and professionalism…"      | Emily J.  | Emily Johnson        |
| 5   | "The nurses from Akansoh Health Services are always punctual and friendly…" | Samuel L. | Samuel Lee           |

For **each** quote please confirm:

1. [ ] It is genuine feedback from a real client or family member.
2. [ ] The person consented (ideally in writing) to it being published on the website.
3. [ ] How they want to be attributed: full name, first name + initial (current), initials only, role only (e.g. "Daughter of a client"), or anonymous.

Remove any quote that can't be confirmed.

## Other pre-launch items

- [ ] Set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, and `CONTACT_FROM_EMAIL` in Vercel Production and Preview. Confirm `CONTACT_TO_EMAIL` (or leave it unset to use `info@akansohealth.com`). Send a test submission with and without JavaScript.
- [ ] In Resend, verify the sending domain and leave open/click tracking off.
- [ ] Optional: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` together (both, or neither) and redeploy.
- [ ] Optional: `NEXT_PUBLIC_JOTFORM_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- [ ] Replace flagged photos (see `docs/image-brief.md`).
- [ ] Confirm service area, licenses and social accounts if any should be listed (none are shown today).
