// Contains editable data for all my professional experiences
// detail pages both read from this one list, so you never touch markup to
// update a role. `slug` is the URL for each detail page (/experience/<slug>).
export type Experience = {
  slug: string
  role: string
  org: string
  dates: string
  tags: string[]
}

export const experiences: Experience[] = [
  {
    slug: 'software-engineering-research-intern',
    role: 'software engineering research intern',
    org: 'UC SanDiego',
    dates: "Summer '26",
    tags: ['internship', 'research', 'software'],
  },
  {
    slug: 'academic-enrichment-tutor',
    role: 'Academic Enrichment Tutor',
    org: 'Morgan State University',
    dates: "fall '25 – present",
    tags: ['on-campus', 'academia', 'tutoring'],
  },
  {
    slug: 'director-of-sponsorships-and-outreach',
    role: 'Director of Sponsorships and Outreach',
    org: 'MorganHacks',
    dates: "fall '24 – present",
    tags: ['people', 'leadership', 'outreach'],
  },
]
