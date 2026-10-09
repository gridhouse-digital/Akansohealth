import { z } from 'zod'
export const contactReasons = [
  { value: 'community-participation-support', label: 'Community Participation Support' },
  { value: 'homemaker-chore', label: 'Homemaker / Chore / Companion Services' },
  { value: 'referral', label: 'Referral' },
  { value: 'request-services', label: 'Request Services' },
  { value: 'respite-care', label: 'Respite Care' },
  { value: 'shift-nursing', label: 'Shift / Enhanced Nursing' },
  { value: 'other', label: 'Something Else' },
  { value: 'transportation-services', label: 'Transportation Services' },
] as const

const serviceAliases: Record<string, string> = {
  'companion-services': 'homemaker-chore',
}

export const reasonForService = (slug: string) => {
  const value = serviceAliases[slug] ?? slug
  return contactReasons.some((r) => r.value === value) ? value : undefined
}

const reasonValues = contactReasons.map((r) => r.value) as [string, ...string[]]

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(
      (v) => v === '' || /^[+()\d\s.-]{7,}$/.test(v),
      'Please enter a valid phone number.',
    ),
  reason: z.enum(reasonValues, { message: 'Please choose a reason for contacting us.' }),
  message: z
    .string()
    .trim()
    .min(10, 'Please share a few details (at least 10 characters).')
    .max(4000),
  company: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export const reasonLabel = (value: string) =>
  contactReasons.find((r) => r.value === value)?.label ?? value
