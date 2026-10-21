import { z } from 'zod'

export const contactRoles = [
  { value: 'individual', label: 'Individual / family member' },
  { value: 'referral-partner', label: 'Referral partner / case manager' },
  { value: 'job-seeker', label: 'Job seeker' },
  { value: 'other', label: 'Other' },
] as const

export type ContactRole = (typeof contactRoles)[number]['value']

const roleValues = contactRoles.map((role) => role.value) as [
  ContactRole,
  ...ContactRole[],
]

export const TURNSTILE_ACTION = 'contact'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number.')
    .max(40)
    .regex(/^[+()\d\s.-]+$/, 'Please enter a valid phone number.'),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  preferredTime: z.string().trim().max(120, 'Please keep this to a short time window.'),
  role: z.enum(roleValues, { message: 'Please tell us who you are.' }),
  hp_leave_blank: z.string(),
})

export type ContactInput = z.infer<typeof contactSchema>

export function honeypotTripped(data: ContactInput) {
  const value = data.hp_leave_blank.trim().toLowerCase()
  if (!value) return false
  const otherValues = [data.name, data.phone, data.email, data.preferredTime, data.role]
  return !otherValues.some((field) => field.trim().toLowerCase() === value)
}

export const roleLabel = (value: string) =>
  contactRoles.find((role) => role.value === value)?.label ?? value

export const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()
