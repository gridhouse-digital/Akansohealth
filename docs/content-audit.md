# Akansoh Health Services — Live Site Content Audit

Source: https://www.akansohhealthservices.com/ (fetched Oct 7, 2026). Static HTML site, Apache + ModSecurity (blocks non-browser user agents).

> **CLIENT-CONFIRM:** domain/email ownership and testimonial consent are open launch blockers — see [`launch-checklist.md`](./launch-checklist.md). The new site no longer shows the Gmail address and abbreviates testimonial names.

## Pages / URLs

| Live URL              | Title                                                                  | New route   |
| --------------------- | ---------------------------------------------------------------------- | ----------- |
| `/` and `/index.html` | Akansoh Health Services - Delivering Multifaceted Healthcare Solutions | `/`         |
| `/about.html`         | About Us - Akansoh Health Services                                     | `/about`    |
| `/services.html`      | Services - Akansoh Health Services                                     | `/services` |
| `/contact.html`       | Contact - Akansoh Health Services                                      | `/contact`  |

- No service detail pages, no blog, no `robots.txt`, no `sitemap.xml`.
- No meta descriptions, no Open Graph tags, no structured data on any page.
- `.html` → clean URL permanent redirects are configured in `next.config.ts`.

## Brand

- Name: Akansoh Health Services (sometimes "Akansoh Services" / "Akansoh Health Service" on the live site — inconsistent).
- Live tagline: "Delivering Multifaceted Healthcare solutions for Wellness".
- Logo tagline (new logo, `Logo.jpeg`): "People | Purpose | Possibility".
- Live site uses old logo `images/logo2.png` and a navy/teal palette (`#17405e`, `#2bb6a3`) that does not match the new green/gold logo.

## Contact details (from /contact.html)

- Address: 4615 Louise Saint Claire Dr, Doylestown, PA 18902
- Email: info@akansohservices.com
- Email: akansoh937@gmail.com
- Phone: +1 347 822 7070 → (347) 822-7070
- Phone: +1 267 370 1956 → (267) 370-1956
- Hours: Mon – Sat, 08:00 am – 08:00 pm ET
- Footer link text: "www.akansohservices.com" (links to akansohhealthservices.com)

> ⚠️ Domain mismatch: the email is `@akansohservices.com` but the site is `akansohhealthservices.com`. Confirm the info@ inbox actually receives mail.

- Service area: not stated anywhere. Only the Doylestown, PA address exists. No service-area claim is made on the new site.
- Social links: none.
- Analytics / tracking scripts: none (only `js/main.js`, 41 bytes).

## Form integration

- `/contact.html` form posts to **FormSubmit**: `action="https://formsubmit.co/divinetechpro7@gmail.com"`, `_cc=divinetechpro7@gmail.com`, `_captcha=false`, `_subject="New contact form message — Akansoh Health Services"`. Fields: name, email, message.
- ⚠️ `divinetechpro7@gmail.com` looks like a previous developer's inbox, not Akansoh's. Client must confirm where inquiries should go.
- Jotform: an account exists (username `akansoh`, account email `akansoh@gridhouse.digital`, free plan, per screenshot), but no Jotform form is embedded on the live site. The new site supports an optional Jotform link/embed via `NEXT_PUBLIC_JOTFORM_URL`.

## Homepage copy (verbatim)

- Hero H2: **Compassionate Care for You**
- Hero text: **At Akansoh Health Services, we combine compassion and healthcare to build a healthy community, one individual at a time.**
- CTA: CONTACT US
- Section: "Our Comprehensive Services" (6 cards, see Services below) → "See All Services"
- About highlight: "About Akansoh Health Services" — **We are committed to delivering high-quality, person-centered healthcare services that empower individuals to live independently and with dignity. Our experienced team provides compassionate care tailored to each client's unique needs.** → "Learn More About Us"
- "Our Recent Work" — "Take a look at our recent projects and initiatives that showcase our commitment to quality care and community well-being." (6 stock photos, mostly doctors/clinic — dropped)
- "Client Feedback" — 5 testimonials (below)
- CTA: "Start Your Journey Today" — "Contact us to learn how we can support you or your loved ones with our tailored care solutions."
- Footer: "© 2024 Akansoh Health Services. All rights reserved."

## Services

Homepage short descriptions:

1. **Companion Services** — Non-medical assistance, observation, and care for adults with intellectual disabilities, promoting independence and emotional well-being.
2. **Homemaker/Chore** — Support with personal care, medication, housework, and meal preparation for individuals with intellectual disabilities.
3. **Transportation Services** — Safe, reliable transportation for medical appointments and community participation.
4. **Community Participation Support** — Assistance with community integration, social activities, and building meaningful relationships.
5. **Shift Nursing** — Professional nursing care for individuals with complex medical needs, including medication, monitoring, and personal care.
6. **Respite Care** — Temporary relief for primary caregivers, ensuring loved ones receive quality care and support in a safe environment.

Services page long descriptions:

- **Companion Services** — We provide non-medical assistance, observation, supervision and care for the health of adults with Intellectual Developmental Disability in their private homes and in the community. Our companion service is designed to support individuals as they navigate the road to living independently and alleviate feelings of loneliness and isolation.
- **Homemaker/Chore** — Support for individuals with intellectual disability to perform personal care, medication management, housework, dressing, grooming, and meal preparation. We help unlock wellness and independence while maintaining open communication with family and caregivers.
- **Transportation Services** — We provide professional and convenient transportation services to and from your home for medical appointments, community participation, and essential outings. Our services ensure safety and reliability for all clients.
- **Community Participation Support** — We support individuals with intellectual and developmental disability to integrate with the community, participate in meaningful activities, and develop social networks. Our focus is on inclusion and empowerment.
- **Shift Nursing** — Our nurses are experienced and provide a high level of care with compassion for every family. We deliver nursing care solutions with a high level of professionalism, including medication management, personal care, monitoring, and safety assurance.
- **Wellness Consultation** (services page only, replaces Respite Care there) — Our expert team provides personalized wellness consultations to help you achieve optimal health. We assess your needs and guide you with tailored recommendations for nutrition, exercise, and lifestyle improvements.

> Services page hero reads "Health Services and Nursing Home" — dropped (contradicts the person-centered, in-home/community positioning; confirm with client). "Wellness Consultation" is not included in the new site's six core services; confirm with client whether it is still offered.

## About page copy (verbatim)

- Hero: "About Us" / "Delivering Multifaceted Healthcare Solutions for Wellness"
- **What We are About** — At Akansoh Health Service, we are committed to transforming the lives of individuals with Intellectual and Developmental Disabilities (IDD) through compassionate, innovative, and personalized healthcare solutions. Our goal is to empower those we serve by providing comprehensive support that enhances their quality of life and fosters independence.
  With a team of highly skilled and dedicated professionals passionate about making a difference, we offer a range of services tailored to meet everyone's unique needs. Our holistic approach combines Homemaker/chore, Companion Service, Shift Nursing Care, and Community Participation support. Transportation Services and life skills training ensures that everyone receives the support they deserve.
- **Mission Statement** — Akansoh Health Service's mission is to support individuals with developmental disabilities to achieve greater independence and function at their highest potential. We are dedicated to improving the lives of individuals who are vulnerable and underserved. We strive to provide individuals with the support needed knowing that individuals are better equipped when anchored in a cohesive support system. We believe individuals have a right to choose their own destiny.
- **Vision Statement** — Akansoh Health Service's vision is to foster a continuum of support services in every community we serve. Also, to be the region's provider of choice for individuals and families seeking services, and as the region's employer of choice for qualified and committed professionals.
- **Why Choose Us** — "Experience unparalleled support and innovative care solutions designed to empower you and your loved ones for a better life."
  - Personalized Care — We tailor our services to meet the unique needs of each individual, promoting personalized paths to wellness and independence.
  - Expert Team — Our experienced professionals include registered nurses and skilled caregivers, providing exceptional care with compassion and expertise.
  - Community Integration — We encourage social participation and community involvement, helping individuals stay connected and engaged with their surroundings.
- CTA: "Start Your Care Journey Today" — "Empower yourself and your loved ones with our tailored care solutions for independence and wellness."

## Contact page copy

- Hero: "Get in Touch"
- "Contact Akansoh Health Services"
- "Send Us a Message — Contact us for any questions, service requests, or support. We're here to help!"

## Testimonials (5, verbatim, all shown with 5 stars)

1. "Akansoh Health Services transformed my father's daily life. The staff is attentive and truly cares about their clients." — **Ramon Gonzalez**
2. "The in-home support we received was exceptional. It made a significant difference for our family during a tough time." — **Jane Efomo**
3. "I can't thank Akansoh enough for their kindness and professionalism. They were there for us every step of the way." — **Emily Johnson**
4. "The nurses from Akansoh Health Services are always punctual and friendly. Highly recommended for anyone needing home care!" — **Samuel Lee**
5. "Akansoh Health Services helped my mother regain her independence. Their support and care are outstanding!" — **Fatima Bello**

> ⚠️ Live testimonials use generic stock headshots from Pexels. The new site shows initials instead of photos. Client should confirm these are genuine and that the people consented to being named.

## Imagery

- All live photos are hotlinked stock (Pexels, Unsplash, iStock). Many show doctors, scrubs, clinics, stethoscopes — dropped.
- Reused (downloaded, Pexels license): 3768131, 6004125, 4239037, 7551656, 1181717, 6257111, 7345474, 7345459. See `docs/image-brief.md`.

## Not found on live site (left out — needs client input)

Licenses/certifications, funding/waiver participation, service area/counties, years in business, staff names/bios, social media, Google Business profile, analytics, privacy policy, accessibility statement, careers info.
