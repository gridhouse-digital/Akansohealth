import { z } from 'zod'
import { services } from './services'

export const contactReasons = [
  { value: 'request-services', label: 'Request services' },
  ...services.map((s) => ({ value: s.slug, label: `Question about ${s.name}` })),
  { value: 'general', label: 'General question' },
  { value: 'other', label: 'Something else' },
] as const

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
