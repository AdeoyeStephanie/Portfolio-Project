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
      'Making audio listening experiences more accessible and interactive — turning linear audio into something you can read, search, and navigate by word on mobile.',
      highlights: [
        'feature — built "Interactive Mode," a full-screen transcript view where users tap any word to jump to that moment, search the transcript to jump between matches, and follow a live-highlighted word that auto-scrolls as audio plays',
        'accessibility — enabled iOS users to fast-forward audio in the browser without it cutting to silence, by remote-debugging on-device with Safari Web Inspector and fixing an iOS Safari Web Audio bug',
        'tool — a full-stack web app for scrubbing and navigating audio content, with a vanilla-JavaScript front end and a Netlify Functions backend',
        'improvement — cut per-update DOM work from O(n) to O(1) by caching transcript-word element lookups and resolved a decay-timer race condition, smoothing real-time playback and gesture response on mobile',
  ],
    },
    tools: ['[JavaScript]', '[Web Audio API]', '[MediaPipe]', '[Howler.js]', '[Netlify Functions]', '[Git/GitHub]', '[Claude Code]'],
    // skills i picked up
    skills: {
      technical: ['[user research]', '[full-stack development]', '[cross-browser / on-device debugging]', '[performance optimization]'],
      soft: ['systematic problem-solving', 'communication'],
    },
    moments: [
      { tint: '#b8ccf2', caption: '[caption]' },
      { tint: '#f0d9c7', caption: '[caption]' },
      { tint: '#9ebd73', caption: '[caption]' },
      { tint: '#f5a873', caption: '[caption]' },
    ],
    note: 'stepping into a new role is scary, but you gain confidence with each challenge.',
  },


  {
    slug: 'academic-enrichment-tutor',
    role: 'Academic Enrichment Tutor',
    org: 'Morgan State University',
    dates: "fall '25 – present",
    tags: ['on-campus', 'academia', 'tutoring'],
    oneLiner:
      'my first job in college',
    hero: { tint: '#b8ccf2', caption: '[photo caption]' },
    glance: {
      role: 'Academic Enrichment Tutor',
      team: '[Academic Enrichment Program (AEP) ]',
      where: 'Baltimore, MD',
      when: "fall '25 – present",
    },
    whatIDid: {
      paragraph:
        'tutoring students in computer science and mathematics as well as general education courses',
      highlights: [
        'events- hosting monthly workshops and study sessions',
        'service — serving the university community at volunteer events',
        'learning — breaking down complex conepts to make them more understandable',
      ],
    },
    tools: ['[navigateEAB]', '[Canva]', '[tool]', '[subject]', '[subject]'],
    skills: {
      technical: [],
      soft: ['communication', 'patience', 'empathy'],
    },
    moments: [
      { tint: '#f5a873', caption: '[caption]' },
      { tint: '#9ebd73', caption: '[caption]' },
      { tint: '#b8ccf2', caption: '[caption]' },
      { tint: '#f0d9c7', caption: '[caption]' },
    ],
    note: 'teaching others the basics of programming often helps me solidify my own understanding.',
  },

  /*morganhacks role */
  {
    slug: 'director-of-sponsorships-and-outreach',
    role: 'Director of Sponsorships and Outreach',
    org: 'MorganHacks',
    dates: "fall '24 – present",
    tags: ['people', 'leadership', 'outreach'],
    oneLiner:
      'Joined a team of passionate individuals to organize the largest HBCU hosted hackathon in Maryland.',
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
        'sponsors — maintained sponsor relationships and secured new partnerships',
        'prizes — increased prizes by 40% from the previous year, the highest in the event’s history',
        'challenges — navigated a sponsor drop out and reorganized event budget',
      ],
    },
    tools: ['[VS Code]', '[Canva]','[Figma]',  'Notion', 'email',],
    skills: {
      technical: [],
      soft: ['negotiation', 'outreach', 'leadership'],
    },
    moments: [
      { tint: '#9ebd73', caption: '[caption]' },
      { tint: '#f5a873', caption: '[caption]' },
      { tint: '#f0d9c7', caption: '[caption]' },
      { tint: '#b8ccf2', caption: '[caption]' },
    ],
    note: 'long hours, no pay, but creating a space for students to bring their ideas to life ',
  },
]
