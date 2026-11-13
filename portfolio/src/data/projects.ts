// ✎ EDIT THIS FILE to fill in your projects. The my-work grid AND every project
// detail page (/my-work/<slug>) read from this one list — you never touch markup.
//
// Anything you leave empty is simply NOT shown on the site (no placeholders, no
// grey boxes), so you can fill things in a little at a time.
//
// PHOTOS: drop image files into  portfolio/public/images/projects/  and point at
// them like  src: '/images/projects/clippey-hero.jpg'.  A photo only appears once
// it has a `src`. Your exported polaroid photos can be used here too.
//
// Fields (all on the DETAIL page unless noted):
//   slug         URL key → /my-work/<slug>. Keep it lowercase-with-dashes.
//   title        project name (card + page headline)
//   summary      one line under the title on the CARD
//   tagline      one line under the headline on the DETAIL page
//   tags         shown as {tag, tag, tag}
//   soon         true → the card shows a blush "coming soon" tile (no photo needed)
//   card         photo on the CARD's polaroid. No `src` → a blush tile with the name.
//   hero         the tilted polaroid at the top right of the page
//   idea         "the idea" — an array of paragraphs
//   tools        "tools i used" card — e.g. ['React', 'Chrome APIs']
//   build        "how it came together" — an array of paragraphs
//   buildPhoto   the polaroid next to "how it came together"
//   screenshots  up to 3 polaroids in the "screenshots" row
//   links        'view on github' / 'try it live' buttons (full URLs; empty = hidden)

export type Photo = {
  /** Image path in /public, e.g. '/images/projects/clippey-hero.jpg'. No src = not shown. */
  src?: string
  /** Describe the photo for screen readers. */
  alt?: string
  /** Handwritten caption under the polaroid. */
  caption?: string
}

export type Project = {
  slug: string
  title: string
  summary: string
  tagline: string
  tags: string[]
  soon?: boolean
  card: Photo
  hero: Photo
  idea: string[]
  tools: string[]
  build: string[]
  buildPhoto: Photo
  screenshots: Photo[]
  links: { github?: string; live?: string }
}

export const projects: Project[] = [
  {
    slug: 'clippey',
    title: 'Clippey',
    summary: 'taking short notes across multiple chrome tabs',
    tagline: 'a chrome extension based clipboard for saving and editing text',
    tags: ['chrome extension', 'clipboard', 'text editing'],
    card: {},
    hero: {},
    idea: ['MacOS lacks native clipboard history. How do i create some sort of clipboard for just my web browser?','This was also my first time building a Chrome extension. The goal was to create something that was not only functional, but also intuitive and easy to use.'],
    tools: [],
    build: ['I started by learning how Chrome extensions work and how to use the Chrome APIs. Then i went into figma to prototype the extension and how it would look on a google tab. This was one of the most interesting parts because i had to create all my visual assets and simulate how the extension would look and work.',
      'At this time I was also quite rusty on API development and JavaScript so I went back to documentation and YouTube tutorials to learn.',
      ''],
    buildPhoto: {},
    screenshots: [],
    links: { github: 'https://github.com/AdeoyeStephanie/Clippey', live: 'https://chromewebstore.google.com/detail/clippey/ahjnaiafahdgcpmkmkinemhfobllloii?pli=1' },
  },
  {
    slug: 'matcha-lab',
    title: 'Matcha Lab',
    summary: 'documenting and tinkering with matcha recipes',
    tagline: 'saving your favorite matcha recipes and creating new ones',
    tags: ['recipes', 'matcha', 'tinkering'],
    card: {},
    hero: {},
    idea: ['I thought of this project during my main matcha era. No it wasn\'t a phase. ',
      'The main goal was to find a way to store my favorite recipes and tinker the measurements when experimenting with new recipes. Then I decided to learn how to use the Gemini SDK and API as the ai aspect of the project.',

    ],
    tools: [],
    build: ['This project is still in development because I kind of lost inspiration for it. Sad, i know, but i\'m planning to finish it over the winter break.',
      'It\'s a project i\'d definitely want to "code by hand" just for the old times sake ',
    ],
    buildPhoto: {},
    screenshots: [],
    links: { github: 'https://github.com/AdeoyeStephanie/Matcha-Lab',},
  },
  {
    slug: 'mock-lab',
    title: 'Mock Lab',
    summary: 'making peer-to-peer mock interviews seamless',
    tagline: 'peer to peer mock interviews for ColorStackers made easy',
    tags: ['interviews', 'peer-to-peer', 'ColorStack'],
    card: {},
    hero: {},
    idea: ['',''],
    tools: ['TypeScript', 'React', 'Next.js'],
    build: ['In Progress'],
    buildPhoto: {},
    screenshots: [],
    links: {},
  },
  {
    slug: 'coming-soon',
    title: 'Coming Soon',
    summary: 'something interesting is cooking...',
    tagline: 'coming soon to your screen. Currently in github',
    tags: ['in progress', 'github'],
    soon: true,
    card: {},
    hero: {},
    idea: [],
    tools: [],
    build: [],
    buildPhoto: {},
    screenshots: [],
    links: {},
  },
]
