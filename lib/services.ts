import {
  Bus,
  HandHeart,
  HeartPulse,
  House,
  type LucideIcon,
  Sprout,
  UsersRound,
} from 'lucide-react'

export type Service = {
  slug: string
  name: string
  icon: LucideIcon
  summary: string
  tagline: string
  intro: string[]
  includes: string[]
  image?: { src: string; alt: string }
}

export const services: Service[] = [
  {
    slug: 'companion-services',
    name: 'Companion Services',
    icon: HandHeart,
    tagline: 'Steady, friendly support at home and out in the community.',
    summary:
      'Non-medical assistance, supervision and companionship for adults with intellectual and developmental disabilities — encouraging independence and emotional well-being.',
    intro: [
      'Our companion services provide non-medical assistance, observation and supervision for adults with intellectual and developmental disabilities, in their own homes and in the community.',
      'Just as important is the relationship. Companionship helps ease loneliness and isolation, and gives each person a steady, familiar presence as they work toward living more independently.',
    ],
    includes: [
      'Non-medical assistance with everyday activities',
      'Observation and supervision that supports health and safety',
      'Support at home and in the community',
      'Companionship that eases loneliness and isolation',
      'Encouragement toward greater independence',
    ],
    image: {
      src: '/images/support-at-home.jpg',
      alt: 'A support professional sitting with an older man in his home',
    },
  },
  {
    slug: 'homemaker-chore',
    name: 'Homemaker / Chore',
    icon: House,
    tagline: 'Help with the daily routines that make a home feel like home.',
    summary:
      'Support with personal care, medication management, housework and meal preparation, so individuals can keep thriving at home.',
    intro: [
      'Daily routines can be easier with the right help. Our homemaker and chore support assists individuals with intellectual disabilities with personal care, medication management, housework, dressing, grooming and meal preparation.',
      'We work alongside each person to build wellness and independence, and we keep communication open with family members and caregivers along the way.',
    ],
    includes: [
      'Personal care, dressing and grooming',
      'Medication management support',
      'Housework and keeping a comfortable home',
      'Meal preparation',
      'Open communication with family and caregivers',
    ],
    image: {
      src: '/images/daily-living-kitchen.jpg',
      alt: 'A woman preparing fresh food at a kitchen sink',
    },
  },
  {
    slug: 'transportation-services',
    name: 'Transportation Services',
    icon: Bus,
    tagline: 'Getting to the places that matter, safely and on time.',
    summary:
      'Safe, reliable transportation to medical appointments, community activities and essential outings.',
    intro: [
      'Getting where you need to go shouldn’t be a barrier to care or connection. We provide professional, convenient transportation to and from home for medical appointments, community participation and essential outings.',
      'Every ride is planned with safety and reliability in mind, so individuals and families can focus on the appointment or activity ahead.',
    ],
    includes: [
      'Rides to and from medical appointments',
      'Transportation for community participation',
      'Essential errands and outings',
      'A focus on safety and reliability',
    ],
  },
  {
    slug: 'community-participation-support',
    name: 'Community Participation Support',
    icon: UsersRound,
    tagline: 'Belonging, friendship and meaningful time in the community.',
    summary:
      'Support to take part in community life, enjoy meaningful activities and build lasting relationships.',
    intro: [
      'Everyone deserves to belong. We support individuals with intellectual and developmental disabilities to take part in their community, enjoy meaningful activities and build social networks of their own.',
      'Our focus is inclusion and empowerment — helping each person stay connected and engaged with the people and places around them.',
    ],
    includes: [
      'Support to participate in community life',
      'Meaningful social and recreational activities',
      'Building friendships and social networks',
      'A focus on inclusion and empowerment',
    ],
  },
  {
    slug: 'shift-nursing',
    name: 'Shift Nursing',
    icon: HeartPulse,
    tagline: 'Skilled, compassionate nursing for complex needs.',
    summary:
      'Professional nursing care for individuals with complex medical needs, including medication management, monitoring and personal care.',
    intro: [
      'For individuals with complex medical needs, our experienced nurses provide a high level of care with compassion for every family.',
      'Shift nursing brings professional, attentive care — including medication management, personal care, monitoring and safety — so individuals can be supported where they are most comfortable.',
    ],
    includes: [
      'Medication management',
      'Personal care',
      'Health monitoring',
      'Attention to safety throughout each shift',
    ],
    image: {
      src: '/images/shift-nursing-home-visit.jpg',
      alt: 'A caregiver checking an older man’s blood pressure at home',
    },
  },
  {
    slug: 'respite-care',
    name: 'Respite Care',
    icon: Sprout,
    tagline: 'Time to rest for caregivers, with care that continues.',
    summary:
      'Temporary relief for primary caregivers, knowing their loved one is receiving quality care and support in a safe environment.',
    intro: [
      'Caring for a loved one is meaningful work, and everyone needs time to rest and recharge. Respite care offers temporary relief for primary caregivers.',
      'While you take that time, your loved one continues to receive quality care and support in a safe environment.',
    ],
    includes: [
      'Temporary relief for primary caregivers',
      'Continued quality care and support',
      'A safe, comfortable environment',
    ],
    image: {
      src: '/images/respite-support-home.jpg',
      alt: 'A support professional talking with a woman on a sofa at home',
    },
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
