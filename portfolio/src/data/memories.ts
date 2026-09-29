// src/data/memories.ts
// The single source of truth for the play section's 12 memory cards.
// Every component (cards, café, clue board, deck) reads from here, so swapping in
// real memories later is a data-only change.
//
// ⚠️ PLACEHOLDER CONTENT — titles, stories, clues and recipes below mirror the
// Figma mockups and are meant to be replaced once the real memories are chosen.

// ---- Café options (straight from the Figma "café / order" screen) ----
export const BASES = ['matcha', 'hojicha', 'strawberry', 'jasmine green'] as const
export const TOPPINGS = ['cheese foam', 'boba', 'oat milk', 'none'] as const
export const SWEETNESS = ['0%', '25%', '50%', '100%'] as const

export type Base = (typeof BASES)[number]
export type Topping = (typeof TOPPINGS)[number]
export type Sweetness = (typeof SWEETNESS)[number]

export type Recipe = { base: Base; topping: Topping; sweetness: Sweetness }

// ---- Cards ----
// holo = iridescent foil, rare = coral foil, common = paper (see Figma "00 · the card")
export type Rarity = 'holo' | 'rare' | 'common'

// Pages a hidden card can live on (matches the router paths in App/Nav).
export type PortfolioPage = 'home' | 'my-work' | 'play' | 'beyond-code'

type BaseMemory = {
  id: string // stable key, used for saving progress in localStorage — don't rename once live
  number: number // 1–12, shown as "01/12" on the card
  title: string // handwritten title on the card front
  story: string // text on the flipped "story side"
  where: string
  when: string
  rarity: Rarity
  photo?: string // path in /public, e.g. '/memories/heytea.jpg' — card shows a placeholder until set
}

// 5 cards come from the café: each recipe unlocks exactly one card (never random).
export type CafeMemory = BaseMemory & {
  source: 'cafe'
  recipe: Recipe
  menuHint: string // shown on the menu board while the drink is still "secret"
}

// 7 cards come from exploring the rest of the portfolio.
export type ExploreMemory = BaseMemory & {
  source: 'explore'
  page: PortfolioPage // which page the hidden trigger lives on
  clue: string // shown on the clue board + the locked slot in the deck
  hidingSpot: string // dev note: what the visitor actually clicks (not shown in the UI)
  unlocksAfter?: string // id of a card that must be found first (clue stays locked until then)
}

export type Memory = CafeMemory | ExploreMemory

export const MEMORIES: Memory[] = [
  // ---------- from the café (5) ----------
  {
    id: 'first-heytea-run',
    number: 1,
    source: 'cafe',
    rarity: 'holo',
    title: 'first heytea run',
    story: 'the night i found out matcha + cheese foam was a thing. we sat outside till close and i made everyone try it.',
    where: 'baltimore, md',
    when: 'spring 2026',
    recipe: { base: 'matcha', topping: 'cheese foam', sweetness: '50%' },
    menuHint: 'the drink that started it all',
  },
  {
    id: 'desk-setup-v2',
    number: 2,
    source: 'cafe',
    rarity: 'rare',
    title: 'desk setup v2',
    story: 'placeholder story — the first time my desk actually felt like mine.',
    where: 'placeholder',
    when: 'placeholder',
    recipe: { base: 'hojicha', topping: 'oat milk', sweetness: '25%' },
    menuHint: 'toasty, cosy, 2am energy',
  },
  {
    id: 'camera-days',
    number: 3,
    source: 'cafe',
    rarity: 'common',
    title: 'camera days',
    story: 'placeholder story — experimenting with my camera.',
    where: 'placeholder',
    when: 'placeholder',
    recipe: { base: 'strawberry', topping: 'boba', sweetness: '100%' },
    menuHint: 'pink, sweet, a little extra',
  },
  {
    id: 'cafe-secret-1',
    number: 4,
    source: 'cafe',
    rarity: 'rare',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    recipe: { base: 'jasmine green', topping: 'none', sweetness: '0%' },
    menuHint: 'green, but not matcha',
  },
  {
    id: 'cafe-secret-2',
    number: 5,
    source: 'cafe',
    rarity: 'common',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    recipe: { base: 'matcha', topping: 'oat milk', sweetness: '0%' },
    menuHint: 'what i drank during finals',
  },

  // ---------- from exploring (7) — home 3 · my work 2 · beyond code 1 · play 1 ----------
  {
    id: 'mirror-selfie',
    number: 6,
    source: 'explore',
    rarity: 'rare',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    page: 'home',
    clue: 'look closer at the girl in the mirror.',
    hidingSpot: 'click the mirror-selfie polaroid on the home page',
  },
  {
    id: 'matcha-footer',
    number: 7,
    source: 'explore',
    rarity: 'common',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    page: 'home',
    clue: 'i said i’d only have one…',
    hidingSpot: '“a lot of matcha lattes” in the footer',
  },
  {
    id: 'home-secret',
    number: 8,
    source: 'explore',
    rarity: 'common',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    page: 'home',
    clue: 'try turning the lights off.',
    hidingSpot: 'placeholder — decide the trigger',
  },
  {
    id: 'case-study-end',
    number: 9,
    source: 'explore',
    rarity: 'rare',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    page: 'my-work',
    clue: 'read until the very end.',
    hidingSpot: 'scroll to the bottom of a case study',
  },
  {
    id: 'my-work-secret',
    number: 10,
    source: 'explore',
    rarity: 'common',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    page: 'my-work',
    clue: 'a page that shouldn’t exist.',
    hidingSpot: 'placeholder — decide the trigger',
  },
  {
    id: 'odd-one-out',
    number: 11,
    source: 'explore',
    rarity: 'rare',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    page: 'beyond-code',
    clue: 'the one that’s not like the others.',
    hidingSpot: 'the odd card out on the beyond code page',
    unlocksAfter: 'case-study-end',
  },
  {
    id: 'polaroid-wall',
    number: 12,
    source: 'explore',
    rarity: 'common',
    title: 'placeholder memory',
    story: 'placeholder story.',
    where: 'placeholder',
    when: 'placeholder',
    page: 'play',
    clue: 'one of these photos isn’t just a photo.',
    hidingSpot: 'polaroid wall page (from the play hub): drag the special polaroid off the board — it sparkles, then turns into this card',
  },
]

export const TOTAL_MEMORIES = MEMORIES.length

// The 13th card — not part of the 12. Unlocked only after all 12 are collected,
// via the finale (cards spin in a ring, collapse, then reveal this). Black + gold foil.
export type SecretMemory = Omit<BaseMemory, 'rarity'> & { source: 'finale'; rarity: 'secret' }

export const SECRET_MEMORY: SecretMemory = {
  id: 'secret-13th',
  number: 13, // shown as "13/12" on purpose
  source: 'finale',
  rarity: 'secret',
  title: 'you found them all',
  story: 'placeholder — a thank-you note for everyone who collected all 12.',
  where: 'placeholder',
  when: 'placeholder',
}

// ---- Helpers (so components never filter the array themselves) ----
export const CAFE_MEMORIES = MEMORIES.filter((m): m is CafeMemory => m.source === 'cafe')
export const EXPLORE_MEMORIES = MEMORIES.filter((m): m is ExploreMemory => m.source === 'explore')

export const getMemory = (id: string) => MEMORIES.find((m) => m.id === id)

// Café: the card a recipe unlocks, or undefined if it's not on the menu.
export const findMemoryByRecipe = (r: Recipe) =>
  CAFE_MEMORIES.find(
    (m) => m.recipe.base === r.base && m.recipe.topping === r.topping && m.recipe.sweetness === r.sweetness,
  )

// Clue board / progress: the hidden cards on one page.
export const memoriesOnPage = (page: PortfolioPage) => EXPLORE_MEMORIES.filter((m) => m.page === page)

// "01/12"
export const formatNumber = (n: number) => `${String(n).padStart(2, '0')}/${String(TOTAL_MEMORIES).padStart(2, '0')}`

// Dev-only sanity check: catches typos when you swap in real memories
// (duplicate ids/numbers/recipes, wrong 5 + 7 split, bad unlocksAfter).
if (import.meta.env.DEV) {
  const problems: string[] = []
  const dupes = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

  dupes(MEMORIES.map((m) => m.id)).forEach((id) => problems.push(`duplicate id "${id}"`))
  dupes(MEMORIES.map((m) => String(m.number))).forEach((n) => problems.push(`duplicate number ${n}`))
  dupes(CAFE_MEMORIES.map((m) => `${m.recipe.base}/${m.recipe.topping}/${m.recipe.sweetness}`)).forEach((r) =>
    problems.push(`two café cards share the recipe ${r}`),
  )
  if (CAFE_MEMORIES.length !== 5) problems.push(`expected 5 café cards, found ${CAFE_MEMORIES.length}`)
  if (EXPLORE_MEMORIES.length !== 7) problems.push(`expected 7 explore cards, found ${EXPLORE_MEMORIES.length}`)
  EXPLORE_MEMORIES.forEach((m) => {
    if (m.unlocksAfter && !getMemory(m.unlocksAfter)) problems.push(`"${m.id}" unlocksAfter unknown id "${m.unlocksAfter}"`)
  })

  if (problems.length) console.warn('[memories.ts]\n- ' + problems.join('\n- '))
}
