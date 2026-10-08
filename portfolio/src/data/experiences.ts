// Editable data for all my professional experiences. The Home cards AND the
// experience overlay both read from this one list, so you never touch markup to
// update a role — edit the data here.
//
// `slug` is the URL key: a card opens its overlay at `/?exp=<slug>`.
//
// Body copy below is PLACEHOLDER (mirrors the Figma template) — swap it for real
// write-ups. Photos are optional: leave `src` off and set a `tint` hex and the
// polaroid shows a coloured block instead (matches the Figma placeholders).

export type Moment = {
  /** Photo in /public. Omit to show a coloured placeholder block. */
  src?: string
  /** Fallback block colour when there's no photo yet. */
  tint?: string
  caption: string
}

export type Experience = {
  slug: string
  role: string
  org: string
  dates: string
  tags: string[]
  /** One/two-line intro under the header (Reenie Beanie). */
  oneLiner: string
  /** Big polaroid at the top-right of the overlay. */
  hero: Moment
  /** The hand-drawn "at a glance" box: 4 quick facts. */
  glance: { role: string; team: string; where: string; when: string }
  whatIDid: { paragraph: string; highlights: string[] }
  /** Rendered in the "tools i used" card, joined with middots. */
  tools: string[]
  skills: { technical: string[]; soft: string[] }
  /** Up to 4 polaroids under "moments". */
  moments: Moment[]
  /** The handwritten coral quote in the "a note to self" box. */
  note: string
}

export const experiences: Experience[] = [
  {
    slug: 'software-engineering-research-intern',
    role: 'software engineering research intern',
    org: 'UC SanDiego',
    dates: "Summer 2026", //brief date
    tags: ['internship', 'research', 'software'],
    oneLiner:
      'my first internship in college, so far away from home in an amazing city',
    hero: { src: '/polaroid-desk.jpg', caption: '[photo caption]' },
    glance: {
      role: '[software engineering research intern]',
      team: '[UCSD STARS / PI: Victor Minces]',
      where: '[San Diego, CA / Hybrid]',
      when: "June - August 2026",
    },
    whatIDid: {
      paragraph:
        'placeholder — describe the problem you worked on, who it was for, and what you built or changed. keep it to 3–4 sentences so it reads like a note, not a résumé.',
      highlights: [
        'placeholder — a thing you built or shipped',
        'placeholder — a result (numbers are great here)',
        'placeholder — something you led or improved',
      ],
    },
    tools: ['[tool]', '[tool]', '[tool]', '[language]', '[framework]', '[design tool]'],
    skills: {
      technical: ['[technical skill]', '[technical skill]', '[technical skill]'],
      soft: ['[soft skill]', '[soft skill]', '[something you got better at]'],
    },
    moments: [
      { tint: '#b8ccf2', caption: '[caption]' },
      { tint: '#f0d9c7', caption: '[caption]' },
      { tint: '#9ebd73', caption: '[caption]' },
      { tint: '#f5a873', caption: '[caption]' },
    ],
    note: 'placeholder — the one thing i’ll carry with me from this role.',
  },


  {
    slug: 'academic-enrichment-tutor',
    role: 'Academic Enrichment Tutor',
    org: 'Morgan State University',
    dates: "fall '25 – present",
    tags: ['on-campus', 'academia', 'tutoring'],
    oneLiner:
      'placeholder — one or two sentences on what this role was and why it mattered to you.',
    hero: { tint: '#b8ccf2', caption: '[photo caption]' },
    glance: {
      role: 'Academic Enrichment Tutor',
      team: '[team / department]',
      where: 'Baltimore, MD',
      when: "fall '25 – present",
    },
    whatIDid: {
      paragraph:
        'placeholder — describe who you tutored, in what subjects, and how you helped them. keep it to 3–4 sentences so it reads like a note, not a résumé.',
      highlights: [
        'placeholder — a thing you built or shipped',
        'placeholder — a result (numbers are great here)',
        'placeholder — something you led or improved',
      ],
    },
    tools: ['[tool]', '[tool]', '[tool]', '[subject]', '[subject]'],
    skills: {
      technical: ['[technical skill]', '[technical skill]'],
      soft: ['communication', 'patience', '[something you got better at]'],
    },
    moments: [
      { tint: '#f5a873', caption: '[caption]' },
      { tint: '#9ebd73', caption: '[caption]' },
      { tint: '#b8ccf2', caption: '[caption]' },
      { tint: '#f0d9c7', caption: '[caption]' },
    ],
    note: 'placeholder — the one thing i’ll carry with me from this role.',
  },

  /*morganhacks role */
  {
    slug: 'director-of-sponsorships-and-outreach',
    role: 'Director of Sponsorships and Outreach',
    org: 'MorganHacks',
    dates: "fall '24 – present",
    tags: ['people', 'leadership', 'outreach'],
    oneLiner:
      'placeholder — one or two sentences on what this role was and why it mattered to you.',
    hero: { tint: '#f0d9c7', caption: '[photo caption]' },
    glance: {
      role: 'Director of Sponsorships & Outreach',
      team: 'MorganHacks',
      where: 'Baltimore, MD',
      when: "fall '24 – present",
    },
    whatIDid: {
      paragraph:
        'placeholder — describe who you reached out to, what you organised, and the impact on the hackathon. keep it to 3–4 sentences so it reads like a note, not a résumé.',
      highlights: [
        'placeholder — a sponsor you landed',
        'placeholder — a result (numbers are great here)',
        'placeholder — something you led or improved',
      ],
    },
    tools: ['[tool]', '[tool]', 'Notion', 'email', '[design tool]'],
    skills: {
      technical: ['[technical skill]', '[technical skill]'],
      soft: ['negotiation', 'outreach', 'leadership'],
    },
    moments: [
      { tint: '#9ebd73', caption: '[caption]' },
      { tint: '#f5a873', caption: '[caption]' },
      { tint: '#f0d9c7', caption: '[caption]' },
      { tint: '#b8ccf2', caption: '[caption]' },
    ],
    note: 'placeholder — the one thing i’ll carry with me from this role.',
  },
]
