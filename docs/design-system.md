# Akansoh Design System

## 1. Benchmark: what we took from Isoke

Reference project: `Isoke Developmental Services/Website/Website/isoke-redesign` (the build that matches live isokedevelops.com — same `index.html` head, linked `.vercel`, Fraunces + Plus Jakarta Sans). `isoke-redesign-v2` is a JSX concept demo and was not used. No Isoke files were modified.

Principles extracted (not copied):

- **Editorial serif + clean sans pairing.** Big display serif headlines with an accented second line; a neutral geometric sans for body.
- **Section rhythm.** Light sections alternate with deep, saturated bands so long pages never feel flat.
- **Numbered labels.** Small uppercase eyebrows with a rule ("— 02 / Our Story") give a magazine cadence.
- **Generous container.** ~1280px max width, 48px desktop gutters, large vertical padding.
- **Soft, confident radii** (24–28px) on cards and media; pill buttons.
- **Restrained motion.** Expo-out easing (`[0.16, 1, 0.3, 1]`), short fades/rises on scroll.

Deliberately not carried over: gradient-mesh backgrounds, glass panels, the hero carousel, the stats strip (Akansoh has no verifiable figures), the violet palette, AI concierge widget.

## 2. Brand direction

Derived from the logo: deep forest-green "A", warm gold leaf flourish, small leaf-green accent, on warm cream. The result reads **warm, grounded, residential** — home and community, not clinic. No hospital, doctor or stethoscope imagery.

Signature device: the **arch** (rounded-top media frame) — echoes a doorway / home, used for hero and key imagery.

## 3. Tokens (`app/globals.css`)

### Color

| Token                               | Hex                               | Utility                   | Use                                 |
| ----------------------------------- | --------------------------------- | ------------------------- | ----------------------------------- |
| `--background`                      | `#fbf7f1`                         | `bg-bg`                   | Page background (warm cream)        |
| `--background-alt`                  | `#f3ebdf`                         | `bg-bg-alt`               | Alternate sections, footer          |
| `--surface`                         | `#ffffff`                         | `bg-surface`              | Cards, form                         |
| `--surface-muted`                   | `#f7f1e8`                         | `bg-surface-muted`        | Inputs, quiet panels                |
| `--surface-deep`                    | `#0f2e25`                         | `bg-deep`                 | Deep bands, CTA, featured cards     |
| `--text-primary`                    | `#142a22`                         | `text-ink`                | Headings, body                      |
| `--text-secondary`                  | `#4a5a51`                         | `text-ink-soft`           | Supporting copy                     |
| `--text-on-deep`                    | `#f4efe6`                         | `text-on-deep`            | Text on deep                        |
| `--text-on-deep-muted`              | `#b9c7bf`                         | `text-on-deep-muted`      | Secondary text on deep              |
| `--border`                          | `#e5dccd`                         | `border-line`             | Hairlines                           |
| `--border-strong`                   | `#d3c6b1`                         | `border-line-strong`      | Inputs, outlined buttons            |
| `--brand-primary`                   | `#1b4b3b`                         | `bg-brand` / `text-brand` | Primary actions, accents            |
| `--brand-primary-hover`             | `#143a2d`                         | `bg-brand-hover`          | Hover                               |
| `--brand-secondary`                 | `#c5964e`                         | `text-gold`               | Gold accents (decorative / on deep) |
| `--brand-secondary-ink`             | `#87601f`                         | `text-gold-ink`           | Gold text on light (AA contrast)    |
| `--brand-accent`                    | `#86a64e`                         | `text-leaf`               | Small leaf accents only             |
| `--success` / `--info` / `--danger` | `#2f6f47` / `#2c5d78` / `#b42318` |                           | Form states                         |

Rule: decorative gold (`#c5964e`) is never used for body text on cream; use `gold-ink`.

### Typography (next/font, self-hosted)

- **Display:** Newsreader (variable, `opsz` axis, roman + italic) — `font-display`. Headings at weight 450, italic second lines at ~380 in brand green.
- **Body/UI:** Manrope — `font-sans`.

Fluid scale (`@theme`): `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-lead`, `text-body`, `text-eyebrow` (all `clamp()` based).

### Shape, depth, motion

- Radius: `--radius-sm .5rem`, `--radius-md .875rem`, `--radius-lg 1.25rem`, `--radius-xl 1.75rem`; buttons are pills.
- Shadows: `shadow-sm/md/lg`, low-opacity green-tinted, used sparingly on floating elements.
- Motion: `Reveal` (fade + 16–24px rise, 600ms, `ease-expo`, once). Buttons: 300ms color, arrow nudges 4px. Global `MotionConfig reducedMotion="user"`; smooth scroll only when motion is allowed.
- Layout utilities: `container-page` (max 82rem; 1.25 / 2 / 3rem gutters), `section-y` (fluid vertical padding), `arch`.
- Breakpoints: Tailwind defaults + `xs` (430px), with `lg` lowered to 56rem (896px) so the desktop header and layouts apply in snapped/zoomed/OS-scaled desktop windows.

## 4. Components (`components/`)

| Component                              | Notes                                                               |
| -------------------------------------- | ------------------------------------------------------------------- |
| `UtilityBar`                           | Deep strip: location + hours (lg+), phone, email                    |
| `Header`                               | Sticky, blurs on scroll, active underline, `aria-current`           |
| `MobileNavigation`                     | Portal dialog, focus trap, Esc, scroll lock, 44px targets           |
| `Hero`                                 | Homepage hero with arch image, inset, floating card                 |
| `PageHero`                             | Breadcrumbs, eyebrow, h1, optional aside                            |
| `SectionIntro`                         | Eyebrow + h2 + intro; split / stacked / center                      |
| `Eyebrow`                              | Gold rule + uppercase label                                         |
| `ServiceCard`                          | `feature`, `image`, `compact`, `tint`, `deep`; whole card clickable |
| `ServiceGrid`                          | Bento layout of the six services                                    |
| `FeatureSplit`                         | Image/media + copy, arch or rounded, reversible                     |
| `ValueCard`                            | Icon + title + text, light/deep tones                               |
| `TestimonialCard`                      | Featured (deep) or default; initials avatar (no stock faces)        |
| `CTASection`                           | Deep panel with CTAs and real contact details                       |
| `ImagePlaceholder`                     | Branded placeholder (`data-placeholder`) for missing photography    |
| `Button` / `TextLink` / `SubmitButton` | Variants + arrow hover                                              |
| `Reveal` / `MotionProvider`            | Scroll reveal, reduced-motion aware                                 |
| `ContactForm`                          | RHF + Zod, accessible errors, mailto fallback                       |
| `Footer`, `Logo`, `JsonLd`             |                                                                     |

Content lives in typed data: `lib/services.ts`, `lib/testimonials.ts`, `lib/site.ts`.

## 5. Homepage architecture

1. Utility bar + header
2. Hero — "Compassionate support. _Meaningful independence._" + core brand sentence, two CTAs, phone/hours
3. Pillars strip — Person-Centered, Compassionate, Community Integration, Professional Care
4. Services — bento grid of all six services
5. Mission — feature split, brand quote
6. Why Akansoh (deep band) — four value cards
7. Community participation feature — wide image + overlapping card
8. How we support you — four steps
9. About preview — logo arch + story
10. Testimonials — one featured + two (all real, from the live site)
11. CTA — contact options
12. Footer
