# Portfolio Migration Plan — HTML/CSS/JS → React

> **This doc is your control center.** Open it at the start of every session, check off what's done,
> and read "Where I left off" at the bottom. It's committed to git so it travels with the project.

---

## 0. Locked decisions

| Decision | Choice | Why |
|---|---|---|
| Framework | **Vite + React** | Learn React fundamentals cleanly; a 4-page portfolio doesn't need Next's SSR. |
| Language | **TypeScript** | Standard for design/UX engineering roles; catches errors, better autocomplete. |
| Styling | **Tailwind CSS** | You already know it; fast, consistent, easy to match Figma tokens. |
| Routing | **React Router** | Client-side routing for Home / About / Projects / Contact. |
| Animation | **Motion** (`motion`, formerly Framer Motion) | The "design engineer" signal — smooth, tasteful transitions. |
| Deploy | **Vercel**  | Best React DX, per-branch preview deploys. Old Netlify/GH-Pages stays live until launch. |
| Icons | **lucide-react** or `react-icons` | Replaces the Font Awesome CDN on the contact page. |

---

## 1. Current codebase audit (what we're migrating)

Live site: https://adeoyestephanie.github.io/Portfolio-Project/

```
index.html      (38 lines)  Home — nav, name title, hero image, resume button
about.html      (73 lines)  About — 4 info blocks (bio, skills, orgs, "what I'm up to")
projects.html   (43 lines)  Projects — 3 project cards + "upcoming" card
contact.html    (57 lines)  Contact — LinkedIn / email / GitHub cards (Font Awesome icons)
style.css      (457 lines)  All styling, per-page body classes (.home-page, .about-page, ...)
portfolio.js     (0 lines)  Empty — referenced but never used
Images/          headshot
Files/           resume PDF
```

**Observations that shape the rebuild:**
- The nav bar is duplicated (hand-copied) across all 4 pages → becomes **one `<Nav>` component**.
- Content is hardcoded in HTML → move to **typed data files** (`projects.ts`, `about.ts`) so you edit data, not markup.
- Fonts chosen: **DM Sans** (headings + body) + **Reenie Beanie** (handwritten accent). System monospace fallback for any technical accents.
- Palette (from Figma Landing Page): **light** — white bg `#ffffff`, black text `#000000`, **coral `#d24836`** accent (headshot backdrop + glow behind the name). *(The old dark theme is gone — the new design is light.)*
- `portfolio.js` is empty and `<script href=...>` on index is malformed (`href` should be `src`) — no JS behavior to port. Clean slate.
- Absolute pixel values everywhere (`gap: 290px`, `left: 70%`) → rebuild responsively with flex/grid + Tailwind.

---

## 2. Target architecture

```
portfolio/                      # new Vite project (see Phase 1)
├─ public/
│  ├─ headshot.jpg
│  └─ Stephanie_Adeoye_SWEResume.pdf
├─ src/
│  ├─ main.tsx                  # entry + router
│  ├─ App.tsx                   # layout shell (<Nav/> + <Outlet/>)
│  ├─ index.css                 # Tailwind directives + font imports + CSS vars
│  ├─ components/
│  │  ├─ Nav.tsx                # the shared menu bar (kills the duplication)
│  │  ├─ Button.tsx             # resume/menu button, one styled primitive
│  │  ├─ ProjectCard.tsx
│  │  └─ ContactCard.tsx        # icon + text, reused 3x
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ About.tsx
│  │  ├─ Projects.tsx
│  │  └─ Contact.tsx
│  └─ data/
│     ├─ projects.ts            # [{ title, description, href, tags }]
│     ├─ about.ts               # bio blocks, skills, orgs
│     └─ contact.ts             # [{ icon, href, label, blurb }]
├─ tailwind.config.ts           # theme tokens from Figma (colors, fonts, spacing)
├─ tsconfig.json
└─ vite.config.ts
```

**Component mapping (old → new):**

| Old markup | New React |
|---|---|
| `.menu-bar` copied on every page | `<Nav/>` rendered once in `App.tsx` |
| `.menu-button` / `.resume-button` | `<Button variant="menu" \| "resume"/>` |
| `.project1/2/3`, `.upcoming-projects` | `projects.ts` data → `.map()` into `<ProjectCard/>` |
| `.contact-linkedin/email/github` | `contact.ts` data → `.map()` into `<ContactCard/>` |
| `.about-info1..4` | `about.ts` blocks → mapped sections |

---

## 3. Git branching & workflow


**Branch model:**
- `main` — always deployable. The **old site keeps living here** until the React version is ready to launch.
- `feat/react-migration` — long-lived integration branch for the whole rebuild. Do the work here.
- `feat/react-migration-<slice>` — short branches off the migration branch per unit of work (e.g. `-nav`, `-home`, `-projects`). Merge back into the migration branch.

```
main ──────────────────────────────────────●(launch: merge React) ──▶
  └─ feat/react-migration ──●──────●──────●──▶
        └─ ...-nav ─●        │      │
        └─ ...-home ─────●   │      │
        └─ ...-projects ────────●
```

**Why not build straight on `main`?** So the live site never breaks mid-rebuild, and so each PR gives you a **Vercel preview URL** to eyeball against your Figma frames.

**Rules of thumb:**
- One logical change per branch. Commit often with clear messages (you already use `feat:` / `fix:` — keep that).
- Open a PR for each slice even solo — the preview deploy + diff review is the payoff. Squash-merge to keep history clean.
- **Clean up first:** there's an orphaned folder at `.claude/worktrees/quizzical-cray` — a leftover from a past isolated Claude Code task (merged in commit `bee1db2`). It's *not* a registered worktree and *not* tracked by git (`.claude/` is gitignored), so just delete the folder:
  ```bash
  rm -rf .claude/worktrees/quizzical-cray
  ```
- Don't commit `node_modules/` (your `.gitignore` should cover it — verify when the project's scaffolded).

---

## 4. Migration phases (the checklist — update as you go)

> **How we work (read this first):** design-driven + hands-on. Figma is connected **live** (see §5) — we pull real
> tokens/layout from the frames rather than guessing, and re-sync when the design changes. Stephanie writes the
> code; Claude guides step by step and explains the *why*. Tokens are pulled **early** (Phase 1) so every component
> is built against the real design, not placeholders.

### Phase 0 — Setup ✅ DONE
- [x] Remove stale worktree (`quizzical-cray`)
- [x] Repo layout: **`portfolio/` subfolder** on `feat/react-migration` (old HTML site + new React build coexist; move to root at launch)
- [x] `npm create vite@latest portfolio -- --template react-ts`
- [x] Add Tailwind, React Router, `motion`, `lucide-react`
- [x] Import DM Sans + Reenie Beanie; set Tailwind `@theme` tokens in `src/index.css`
- [x] Vercel connected: Root Directory = `portfolio`, Production Branch = `feat/react-migration`, auto-builds on push. Live at `portfolio-project-sage-psi.vercel.app`

### Phase 1 — Design tokens + shell & routing ⬜
- [x] **Pull real tokens from Figma → `@theme` in `src/index.css`** (2026-09-16). Light palette: `--color-paper #ffffff` (bg), `--color-ink #000000` (text), `--color-coral #d24836` (accent — headshot backdrop + the glow behind the name). `--font-sans` DM Sans (all weights: ExtraLight nav, Regular body, SemiBold Italic headline), `--font-script` Reenie Beanie. → utilities `bg-paper` / `text-ink` / `text-coral` / `font-sans` / `font-script`.
- [x] `<Nav/>` component: `home · my work · play · beyond code` (DM Sans). **Active page = coral, hover = bold**, inactive = extralight. **Distress texture** via SVG `#rough` filter — now defined once in `App.tsx` and shared by nav + cards.
- [ ] `<Button/>` primitive — deferred; no generic button needed yet ("learn more" / resume handled inline)
- [x] Router + `App.tsx` shell (`<Nav/>` + `<Outlet/>`). **Routes:** `/` Home, `/my-work`, `/play`, `/beyond-code`, `/experience/:slug` (detail). Experience merged into Home — no standalone `/experience`.
- [x] Page components in `src/pages/`: **Home (built)**, MyWork/Play/BeyondCode (stubs), ExperienceDetail (stub). Removed old standalone `Experience.tsx`.

### Phase 2 — Sections (build each against its Figma frame; one branch each) ⬜
*Old Home/About/Projects/Contact structure is abandoned — the Figma IA below is the source of truth.*
- [x] **Home page built (2026-10-06) — ✅ DONE FOR NOW (2026-10-08)** — hero (one-line name headline w/ coral glow, pronunciation, Reenie Beanie tagline, coral headshot), bio + 2 polaroids, **professional experiences** list (3 cards w/ Figma pen border → open the experience overlay), pink footer w/ socials. Built responsively (flex, NOT Figma's absolute coords). New: `Polaroid`, `ExperienceCard`, `Footer`, `experiences.ts`. **Resume buttons (built 2026-10-08):** new `src/components/ResumeButton.tsx` (one component, `full` + `pill` variants, from Figma `resume_button` `439:1668` / `resume_pill` `439:1672`) — "see the full resume" under the experiences + a "resume" pill in the footer, both opening `public/Stephanie_Adeoye_Resume.pdf` (latest copy) in a new tab.
- [ ] **my work** — project cards (Figma "my work" frame); repeated data → `src/data/projects.ts`
- [x] **experience** (built 2026-10-08) — clicking an experience card on the Landing Page opens an **overlay on top of the homepage** (changed 2026-10-08 from separate pages). Built from Figma `home_section`: `364:1837` SE research intern, `364:1838` academic enrichment tutor, `378:2067` director of sponsorships & outreach — each is a 1512×982 overlay frame: a dimmed scrim (click = close), a white rounded **modal with a big shadow that scrolls inside**, **← / → arrow buttons** on the sides (plus ←/→ keys) to move between all three, and × / Esc to close. Modal content: role headline (name-headline style with coral shadow) + org/dates/tags + hero polaroid; "at a glance" box (hand-drawn border); ☆ what i did + tools card; ☆ skills chips; ☆ moments (4 polaroids); note-to-self quote. All body text is placeholder. **Done:** new `src/components/ExperienceModal.tsx` (URL-driven via `?exp=<slug>`, portal, focus-trap, scroll-lock, scroll-reset on nav, wraps around, `prefers-reduced-motion`); `src/data/experiences.ts` expanded to the full detail model; `ExperienceCard` now links `?exp=<slug>`; old `/experience/:slug` route **redirects** to `/?exp=<slug>`; hand-drawn borders `public/{glance-box,note-box}.svg`.
- [ ] **beyond code** — category cards (Figma "Beyond code" frame `78:14`) open **overlays** instead of pages (changed 2026-10-08): **people** `364:1851`, **film** `364:1957`, **far and sweet** `364:1904`. Each overlay: a dimmed scrim (**click anywhere outside to close**, then open another), a scrolling modal with a shadow, a floating **tab bar "people · film · far and sweet"** above it to switch directly between the three, and × / Esc. Content: people = filter chips + event cards with fanned polaroids; film = @loggedbysteph profile row + series chips + 5×2 reel grid linking to Instagram; far and sweet = entry index + taped polaroid + lined journal spreads with "felt:" mood chips. Photos/text mostly placeholder. Data → `src/data/{events,films,journal}.ts` when built.
- [ ] **play** — memory-card scavenger hunt (see "Play section — decided 2026-09-29" below; Figma section `play_scopes` `320:67`)
- [x] Icons via **lucide-react** (not the old Font Awesome CDN); copy resume PDF + headshot into `portfolio/public/` — headshot + **latest resume PDF** (`Stephanie_Adeoye_Resume.pdf`) now in `portfolio/public/`

### Phase 3 — Motion, responsive & polish ⬜
- [ ] Responsive / mobile pass — **deferred: building desktop-first for now** (the old site isn't responsive — kill the fixed pixel offsets like `gap: 290px`, `left: 70%`)
- [ ] Motion with `motion`: page transitions, hover states, subtle entrance animations (tasteful Reenie Beanie accents where they fit)
- [ ] Accessibility + Lighthouse check
- [ ] Final design re-sync against the latest Figma frames

### Phase 4 — Launch ⬜

**🚀 Early launch (chosen 2026-10-08): go live now with Home, off `feat/react-migration`.** Defer the clean merge/root-move to the end. Runbook:
- [ ] **Vercel — add the custom domain.** Project → Settings → Domains → add the Porkbun `.com` (and `www.`). Production branch stays `feat/react-migration`, Root Directory stays `portfolio`. Vercel will show the DNS records to set.
- [ ] **Porkbun — repoint DNS Netlify → Vercel.** In Porkbun DNS, replace the Netlify records with Vercel's: apex `A` → `76.76.21.21` (confirm the exact value Vercel shows), and `www` `CNAME` → `cname.vercel-dns.com`. Lower the TTL first if you can, to speed propagation.
- [ ] **Keep Netlify live until DNS propagates**, then retire the Netlify site. Verify `https://<domain>` serves the React app and auto-HTTPS (Vercel cert) is issued.
- [ ] Sanity-check live: Home renders, resume PDF opens, experience overlay opens, and my work / play / beyond code show the **coming-soon** screens (not broken).

**Clean-up launch (later, once all pages are built):**
- [ ] Merge `feat/react-migration` → `main`; move `portfolio/` contents to repo root
- [ ] Switch Vercel **Production Branch back to `main`** (+ update Root Directory if moved)
- [ ] Update `README.md` tech stack section
- [ ] Archive old HTML files (git history keeps them; can delete from the working tree)

---

## 5. Design workflow — live Figma (changes frequently)

Figma is connected **live** to this Claude Code session (confirmed via `whoami` → Stephanie's Figma org, 2026-09-16). No PNG exports or `design/` folder needed — Claude reads frames on demand.

**Sync rhythm** (because the file changes often):
- **Tokens are the stable contract.** Colors, type scale, and spacing change rarely → mirror them into `@theme` in `src/index.css` once (Phase 1). Every component reads those tokens, so a palette change is a one-place edit, not a 30-component rewrite.
- **Layout is the fluid layer.** Sync it at checkpoints, not continuously — when building a page (Phase 2) or on an explicit "re-sync page X."
- **Log design *decisions*** (the *why* Figma doesn't capture) right here in this doc. Only spin up a separate `DESIGN.md` if notes outgrow it.

### Design reference — read from Figma 2026-09-16

**File:** `Portfolio-Website` (fileKey `0OlfnAukOSNNvSBkiXzod7`). **Canonical frame: "Landing Page"** (node `1:2`). **Ignore any frame named "(old)"** unless told otherwise. File uses no Figma *variables* yet — tokens read directly from frames.

**Tokens (now in `@theme`):** bg `#ffffff`, text `#000000`, accent coral `#d24836`. Fonts: DM Sans (ExtraLight / Regular / SemiBold Italic) + Reenie Beanie.

**Type scale (Figma px @1512 canvas — scale down for responsive web):** headline 98px DM Sans SemiBold Italic (coral text-shadow, tracking ~-4px); nav 40px DM Sans ExtraLight; tagline 40px Reenie Beanie; pronunciation 28px DM Sans ExtraLight Italic underlined; bio 27px DM Sans Regular. Headshot: coral bg, `border-radius: 68px`.

**IA / nav:** `experience · my work · play · beyond code`. Frames: Landing Page `1:2` (hero + bio), my work `38:7`, experience `63:131`, Beyond code `78:14`, play `92:58`. Shared `navbar` component in Figma (top-right).

**Open questions:** (1) single scrolling page + anchors, or routes per section? (2) exact background — pure white vs a warm off-white? (3) where does Contact live (no nav item for it)? **Motion:** the design has animated nodes → pull `get_motion_context` in Phase 3.

### Play section — decided 2026-09-29

Figma section **`play_scopes (chosen: C + B + D + E)`** (`320:67`, nested inside `play_section`). Chosen: **Scope C (scavenger hunt) as the hub + Scope B (café) as a sub-page + D (collect moment) + E (deck)**. Scope A (binder only) was deleted from Figma.
- **Concept:** 12 "memory" trading cards (memories, not cities — Stephanie doesn't travel outside the US). Clues around the whole site lead to cards; the reward is a card people can **save as .png**. Finishing all 12 unlocks a secret 13th.
- **Card design** (`00 · the card`, components `320:69` holo / `320:80` rare / `320:90` common / `321:67` face-down / `321:72` story side / `321:83` locked slot): inspired by Evan Fasquelle's trading-card portfolio (foil body + 3D tilt, thin inner rule, tiny uppercase corner labels, script title over big light numerals, dotted empty slots), re-skinned in coral/paper + DM Sans/Reenie Beanie with polaroid-sticker photos.
- **Flow:** play page = clue board (`321:311`) with "stations". The café station links to the café page (`321:186`): build a drink → the receipt prints → a card slides out. "← back to the hunt" returns. These links are set up in Figma prototype mode.
- **Collect animation** (`321:406`), ~2.5s and skippable: trigger sparkle → face-down card pops up → Y-flip → holo sweep + confetti + keep/save .png → shrinks along an arc into the nav deck, badge +1. Respect `prefers-reduced-motion`.
- **Deck** (`321:563`): nav deck icon with a count badge on every page → right drawer with a grid, locked slots that show their clue, and the selected card + its story side.
- **Build notes:** `motion` for the spring and the fly-into-deck animation; holo via CSS gradients driven by cursor position (ref: simeydotme/pokemon-cards-css); `canvas-confetti`; `html-to-image` for save .png; collected state in `localStorage` (no login).
- **Prototype screens (built 2026-09-29, 1512×982, no annotations):** the `play` frame `92:58` is now the hunt hub (clues, stations, progress, "your cards" strip, deck button). Section **`play_screens (prototype)`** `329:428` (nested inside `play_section`, 4-column grid) holds: `café / order` → `café / receipt` → `collect / 1 pop` → `collect / 2 flip` → `collect / 3 reveal` → `collect / 4 into deck`, then `deck / open` → `deck / card front` ⇄ `deck / card story`. In every collect screen the card has the same layer name, `card (click to collect)`, so Smart Animate can match it between screens. Cards are one component set, `memory card` (`329:263`, property `type`); nav deck = component `deck button` (`329:264`, `count` property). Only the café station and the back links are connected; Stephanie is doing the rest of the prototype wiring.
- **Card split (decided):** 12 cards = **5 from the café** (each drink recipe gives one fixed card, never random) + **7 from exploring the portfolio** (clues around home / my work / beyond code / play).
- **Desktop only for now** (1512 canvas). Mobile layout for the hunt + deck drawer is deferred to a later responsive pass (Phase 3).
- **Still to decide:** the real 12 memories + their clues; the 5 drink recipes and which memory each one maps to.
- **Polaroid wall (built 2026-09-29):** a sub-page opened from the hub's polaroid-wall station. A board of 9 polaroids from different projects (photos are placeholders; some are coloured blocks). **Dragging** a polaroid shows whether it's a card: a normal one reveals "nope, just a photo :)" and springs back; the special one (layer name `card (click to collect)`) glitters, then turns into the face-down card and plays the same pop → flip → reveal → into-deck sequence as the café. Afterwards the board shows a "found ✦" slot. Screens are in `play_screens (prototype)` rows 4–5 (`polaroid wall / …`), with the flow `play — polaroid wall`. In the prototype, only "the mirror" and the special polaroid can be dragged.
- **Finale — the 13th card (built 2026-09-29):** after all 12 are collected: "you found all 12" (the 12 cards in a row) → the cards spin in a 3D ring around the "sa." mark (inspired by the ring gallery on risingfounder.net; faked in Figma with depth-scaled and width-squashed cards, backs showing face-down) → they collapse into a glowing stack → the **secret 13th card** (new `type=secret` variant: black + gold foil, "13/12") on a dark screen with save .png / see my deck. Screens are `finale / 1–6` in `play_screens` rows 6–7, and they play by themselves with Smart Animate (the flow is `play — finale (all 12 → 13th card)`). The ring cards are named `ring card 1…12`, which is what Smart Animate uses to match them between screens. In code this will be a real 3D ring (CSS `rotateY` + `translateZ`, or three.js) that visitors can also drag to spin. Data: `SECRET_MEMORY` in `memories.ts`.
- **Data file (placeholder, 2026-09-29):** `portfolio/src/data/memories.ts` holds all 12 cards (5 `cafe` with `recipe` + `menuHint`, 7 `explore` with `page` + `clue` + `hidingSpot`), the café option lists, and helpers (`findMemoryByRecipe`, `memoriesOnPage`, `formatNumber`, …). When the real memories are chosen, only this file changes. A dev-only check warns in the console about duplicate ids, numbers or recipes, or a split other than 5 + 7.

**How to pull design context:** Stephanie pastes a Figma **frame/file URL** → Claude loads the `figma-design-to-code` skill (required before `get_design_context`) → reads tokens/layout → mirrors into code. **Cosmos** (cosmos.so) stays the inspo board; reference it for motion/layout calls.

## 6. Your resumable workflow ("pick up anytime")

Tools: **Claude Code** · **Claude CLI** · **VS Code** · **Figma** · **Cosmos**

### Start-of-session ritual (2 min)
1. Open the project in **VS Code**, launch **Claude Code**.
2. Say: *"Read MIGRATION.md and tell me where I left off."* — this doc + the "Where I left off" note below = instant context.
3. `git status` and `git branch` to see your working state.
4. Pick the next unchecked box in the current phase's checklist (§4).

### During a work slice
1. `git checkout feat/react-migration && git pull`
2. Branch: `git checkout -b feat/react-migration-<slice>`
3. Open the matching **Figma frame** (+ **Cosmos** board for inspo).
4. Work with Claude Code on that one component/page. Run `npm run dev` to see it live.
5. Commit in small steps with `feat:`/`fix:` messages.

### End-of-session ritual (2 min) — *this is what makes it resumable*
1. Push your branch; open a PR → check the **Vercel preview URL**.
2. **Update this file:** tick the boxes you finished, and rewrite the "Where I left off" block below with: current branch, what's done, the *very next* action, and any open question.
3. Commit the doc update: `git commit -am "docs: update migration progress"`.

> Because the checklist and the note live in the repo, you never lose the thread — whether you stop for a
> day or a month, step 2 of the start ritual rebuilds your full context.

---

## 7. Where I left off  ✍️ *(update every session)*

- **Last worked:** 2026-10-08
- **Current branch:** `feat/react-migration` (clean — the Home build is **committed** as `6b4e997 feat: created home page with about, images and professional experience details`)
- **Done in the last work session (2026-10-06, now committed):**
  - **Re-checked Figma live** (design had grown a lot). Home is now one scrolling **Landing Page** (`1:2`, 3585px tall): hero + bio + professional experiences. Figma nav is now `home · my work · play · beyond code`. Confirmed the **Home + Experience merge**.
  - **Built the Home page** from the live Figma — hero, bio + 2 polaroids, 3 experience cards (→ `/experience/:slug`), pink footer with real social links. **Responsive flex layout**, deliberately NOT Figma's absolute positioning.
  - **Nav** → `home · my work · play · beyond code`; **active = coral, hover = bold**. The "home" item fixes the old "no way back" gap. Moved the `#rough` distress filter into `App.tsx` so nav + cards share it.
  - **Experience card border** now uses Figma's actual **pen SVG** (`public/exp-card-border.svg`) instead of the `#rough`-filtered CSS border (which looked pencil-like).
  - **Name forced to one line** (`clamp(2rem,6vw,5rem)` + `whitespace-nowrap`).
  - **Images downloaded + optimized** into `public/` (headshot, 2 polaroids, divider, card border): **17 MB → ~360 KB**.
  - `npm run build` passes; verified in browser (name one line, nav coral/bold, pen border, cards).
  - New files landed: `src/components/{Polaroid,ExperienceCard,Footer}.tsx`, `src/data/experiences.ts`, `src/pages/ExperienceDetail.tsx` (stub), `public/{headshot.jpg,polaroid-fall.jpg,polaroid-desk.jpg,divider.svg,exp-card-border.svg}`. Deleted the standalone `src/pages/Experience.tsx` (merged into Home).
- **✅ Done 2026-10-08 — experience overlay + resume buttons built & committed.** Resume buttons: `ResumeButton.tsx` (full + pill), wired into Home + Footer, linking `public/Stephanie_Adeoye_Resume.pdf`. Experience overlay: re-pulled the live Figma overlay frames and built the whole thing. New `src/components/ExperienceModal.tsx` + expanded `src/data/experiences.ts` (full detail model); `ExperienceCard` now links `?exp=<slug>`; `src/pages/ExperienceDetail.tsx` is now just a redirect (`/experience/:slug` → `/?exp=<slug>`) so old links still work; downloaded `public/{glance-box,note-box}.svg`; added `.claude/launch.json` (portfolio-dev). **Overlay mechanics (the functional core):** open state lives in the URL `?exp=<slug>` (linkable/shareable, back-button closes); rendered through a **portal** into `<body>`; **scrim click, × and Esc** all close; **← / → buttons and arrow keys** cycle through all three (wrapping); **background scroll locked**, modal scrolls, and **scroll resets to top** on prev/next; **focus moved in, trapped with Tab, restored on close**; `role="dialog"` + `aria-modal` + `aria-labelledby`; subtle fade/scale via `motion`, skipped under `prefers-reduced-motion`. **Verified in-browser:** card-click opens, deep link opens, arrows/keys navigate, all close paths work, content swaps per role; `npm run build` passes. Body copy is Figma-style placeholder — Stephanie is filling it in.
- **🚀 DECISION 2026-10-08 — launch early with just Home.** Rather than wait for all pages (original target was Mon 2026-10-12), go live now with the Home page and finish **my work / play / beyond code** *live* (adds pressure to finish). The React site already auto-deploys to Vercel from `feat/react-migration` (`portfolio-project-sage-psi.vercel.app`); "launch" = pointing the real `.com` (currently Netlify) at it. **Launch path chosen: launch off `feat/react-migration`** — keep Vercel deploying that branch and point the domain at it; defer the merge-to-main + move-to-root until the site is complete (so finishing the other pages live keeps shipping straight to the domain). **✅ BLOCKER RESOLVED (2026-10-08):** the three unbuilt nav pages now show an on-brand **coming-soon** screen instead of bare `<h1>` stubs — new `src/components/ComingSoon.tsx`, used by `MyWork` / `Play` / `BeyondCode` (title + handwritten note + "← back home" + footer).
- **Next action (post-launch):** continue Phase 2 *live* — **my work** (`src/data/memories.ts`, 13 cards), **beyond code** (people / film / far-and-sweet — now **overlays with a tab bar**, not prev/next, per §4), **play** (scavenger hunt). Fill in the experience overlay body copy. Each push to the production branch goes straight to the live domain.
- **To verify yourself:** the **footer social links** point at the old LinkedIn/GitHub/email — confirm they're current.
- **Resolved from last time:** ✅ home link (nav "home"); ✅ Home + Experience merged; ✅ Home build committed (`6b4e997`).
- **Notes:** building **desktop-first** (responsive pass = Phase 3); **motion** still pending (Phase 3 → `get_motion_context`). Config/dep changes need a dev-server restart; `.tsx`/`.css` hot-reload.
