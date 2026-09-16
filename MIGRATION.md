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
- [x] `<Nav/>` component: `experience · my work · play · beyond code` (DM Sans ExtraLight) with active-underline + hover; **distress texture** via SVG `#rough` filter (see "Where I left off"). Sizing/spacing to be fine-tuned against Figma in Phase 2.
- [ ] `<Button/>` primitive (variants matched to Figma) ← *next*
- [x] Router + `App.tsx` shell (`<Nav/>` + `<Outlet/>`). **Multi-page routes:** `/` = Home (Landing: hero + bio), `/experience`, `/my-work`, `/beyond-code`, `/play`. Nav = React Router `NavLink`s. Verified in browser.
- [x] Section/page components as route targets (`src/pages/`: Home, Experience, MyWork, Play, BeyondCode — stubs; content in Phase 2)

### Phase 2 — Sections (build each against its Figma frame; one branch each) ⬜
*Old Home/About/Projects/Contact structure is abandoned — the Figma IA below is the source of truth.*
- [ ] **Hero + bio** (top of Landing Page): name headline (DM Sans SemiBold Italic, coral glow), pronunciation, Reenie Beanie tagline, coral headshot; "who is Stephanie" bio paragraphs
- [ ] **my work** — project cards (Figma "my work" frame); repeated data → `src/data/projects.ts`
- [ ] **experience** — Figma "experience" frame
- [ ] **beyond code** — category cards (Figma "Beyond code" frame)
- [ ] **play** — Figma "play" frame
- [ ] Icons via **lucide-react** (not the old Font Awesome CDN); copy resume PDF + headshot into `portfolio/public/`

### Phase 3 — Motion, responsive & polish ⬜
- [ ] Responsive / mobile pass (the old site isn't responsive — kill the fixed pixel offsets like `gap: 290px`, `left: 70%`)
- [ ] Motion with `motion`: page transitions, hover states, subtle entrance animations (tasteful Reenie Beanie accents where they fit)
- [ ] Accessibility + Lighthouse check
- [ ] Final design re-sync against the latest Figma frames

### Phase 4 — Launch ⬜
- [ ] Merge `feat/react-migration` → `main`; move `portfolio/` contents to repo root
- [ ] Switch Vercel **Production Branch back to `main`**
- [ ] Repoint the Porkbun `.com` DNS: **Netlify → Vercel** (add the domain in Vercel, update Porkbun records). Keep the Netlify site live until DNS propagates, then retire it.
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

- **Last worked:** 2026-09-16
- **Current branch:** `feat/react-migration` (pushed; **today's work is uncommitted — see ⚠️ below**)
- **Done today:**
  - **Phase 0 DONE** — Vercel build green; React app live at `portfolio-project-sage-psi.vercel.app` (Root Dir `portfolio`, Production Branch `feat/react-migration`).
  - **Figma connected LIVE** (see §5). Read the canonical **Landing Page** (node `1:2`; ignore "(old)" frames). Pulled real tokens → `@theme` in `src/index.css`: **light palette** `--color-paper #fff`, `--color-ink #000`, `--color-coral #d24836`; DM Sans + Reenie Beanie. (The old dark theme is gone.)
  - **Routing decided: multi-page.** IA `/` Home (Landing: hero + bio), `/experience`, `/my-work`, `/play`, `/beyond-code`.
  - **Phase 1 shell built & verified in browser:** `components/Nav.tsx` (NavLinks + active underline), 5 page stubs in `src/pages/`, `App.tsx` layout (`<Nav/>` + `<Outlet/>`), router in `src/main.tsx`. Navigation works.
  - **Nav distress texture** (matches Figma): inline SVG `feTurbulence` + `feDisplacementMap` (filter id `#rough`, `scale=4`, `baseFrequency=0.9`) applied ONLY to nav links via `style={{ filter: 'url(#rough)' }}`. Tune: `scale` = roughness, `baseFrequency` = speck size. *(A global page-grain overlay was tried first and reverted — the texture is per-nav-text only.)*
- **⚠️ Uncommitted:** `src/index.css`, `src/components/Nav.tsx`, `src/pages/*` (5 files), `src/App.tsx`, `src/main.tsx`, `MIGRATION.md`. **Commit these** (next session or now).
- **Next action:** (1) commit today's work; (2) finish Phase 1 → build the **`<Button/>`** primitive; (3) start Phase 2 → build **Hero + bio** against the Landing Page frame: DM Sans SemiBold Italic headline w/ coral glow, Reenie Beanie tagline, coral headshot, + the pink footer with a **"my resume"** button and the *"made with God's grace + Holy Spirit's inspiration"* line.
- **🔎 Stephanie's ideas to revisit FIRST next session (raised 2026-09-16):**
  1. **No "home" link** — after clicking any nav item there's no way back to `/`. Add one (e.g. make the "Stephanie Adéoyè" name/logo clickable → `/`, and/or add a home nav item).
  2. **Consider merging Home + Experience into one scrollable page.** Rationale: not much internship/technical experience yet to fill a standalone Experience page. This would drop `/experience` as a separate route and fold that content into the Home/Landing scroll. **Decide this before building more** — it changes the nav and routes (nav would become `my work · play · beyond code`, with experience as a Home section).
- **Open questions / notes:** exact background (pure white vs warm off-white?); where does **Contact** live (no nav item for it?). **Motion** exists on the frames → call `get_motion_context` in Phase 3. Reminder: config/dep changes need a dev-server restart; `.tsx`/`.css` hot-reload.
