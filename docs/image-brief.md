# Image Brief

Goal: replace stock with real Akansoh photography (or carefully chosen licensed stock) that shows **everyday life at home and in the community** — people being supported, not patients being treated.

## Direction

- Warm natural light, home interiors, neighborhoods, parks, shops, community spaces around Bucks County.
- Real moments: conversation, cooking, errands, walking, a shared laugh. Eye-level, unposed.
- People with intellectual and developmental disabilities shown as active participants, with dignity.
- Wardrobe in everyday clothes; caregivers in casual or neutral uniform at most.
- Avoid: scrubs, white coats, stethoscopes, blood-pressure cuffs, hospital beds, clinics, IV poles, pill close-ups, sad/isolated framing, protest or crowd scenes.
- Palette harmony: warm neutrals, greens and wood tones sit best with the cream / forest / gold brand.
- **Consent:** written model releases for anyone identifiable, especially clients.

## Current images (all Pexels license, downloaded from the live site)

| File                                           | Pexels ID | Used for                           | Status                                        |
| ---------------------------------------------- | --------- | ---------------------------------- | --------------------------------------------- |
| `public/images/companionship-conversation.jpg` | 3768131   | Home hero (arch)                   | Keep until replaced                           |
| `public/images/daily-living-kitchen.jpg`       | 6004125   | Home hero inset, Homemaker / Chore | Keep until replaced                           |
| `public/images/support-at-home.jpg`            | 7551656   | Companion Services, About team     | Keep until replaced                           |
| `public/images/conversation-table.jpg`         | 1181717   | Home mission, About hero           | Keep until replaced                           |
| `public/images/homemaker-home-care.jpg`        | 4239037   | Unused spare                       | Optional                                      |
| `public/images/shift-nursing-home-visit.jpg`   | 7345474   | Shift Nursing (page + card)        | ⚠️ Shows a stethoscope — replace first        |
| `public/images/respite-support-home.jpg`       | 7345459   | Respite Care (page + card)         | ⚠️ Shows a blood-pressure cuff — replace soon |

Dropped from the live site: the community photo (6257111 — protest-sign scene) and all doctor/clinic/scrubs images.

## Slots needing photography

Branded placeholders (`components/ImagePlaceholder.tsx`, `data-placeholder` attribute) currently fill these. Drop a file in `public/images/` and set `image` in `lib/services.ts` (or swap the placeholder in the page) to go live.

| Slot                        | Where                                                                                          | Ratio / export size                                                  | Subject                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Community participation     | Home community feature (21:9), Services list, `/services/community-participation-support` hero | 21:9 → 2400×1030 (also crops to 4:5 and 4:3 — keep subject centered) | A supported individual out in the community: café, library, park, class, volunteering, with a staff member alongside                       |
| Transportation              | Services list, `/services/transportation-services` hero                                        | 4:3 → 2000×1500; 4:5 → 1600×2000                                     | Arriving at or leaving a destination, getting into a car or van, helping with a seatbelt                                                   |
| Shift nursing (replacement) | Home grid card (deep), Services list, detail hero                                              | 4:5 → 1600×2000 and 16:10                                            | Nurse in a home setting doing a calm, non-clinical task: reviewing a routine, helping with medication organizer, chatting — no stethoscope |
| Respite care (replacement)  | Home grid card, Services list, detail hero                                                     | 16:10 → 2000×1250; 4:5                                               | A family caregiver relaxing / stepping out while a staff member engages the loved one in an activity                                       |

## Nice-to-have upgrades

| Slot                             | Ratio / size    | Subject                                                               |
| -------------------------------- | --------------- | --------------------------------------------------------------------- |
| Home hero (arch)                 | 4:5 → 1600×2000 | Signature image: an Akansoh team member with a client, warm and close |
| Home hero inset                  | 1:1 → 1200×1200 | Daily-living detail: cooking, folding laundry, a game                 |
| About hero / mission             | 4:5 → 1600×2000 | Team or founder portrait in a home or community setting               |
| About team                       | 4:3 → 2000×1500 | Small group of real staff, candid                                     |
| OG image (`public/og-image.jpg`) | 1200×630        | Current: logo on cream. Optional: brand photo + logo lockup           |

## Export specs

- JPEG, sRGB, quality ~80, longest edge as listed; `next/image` serves AVIF/WebP at the right size.
- Leave breathing room around faces; the arch frame crops the top corners.
- Write descriptive alt text when adding images (who / what, not "image of").
