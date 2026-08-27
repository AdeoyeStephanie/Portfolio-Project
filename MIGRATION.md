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
| Deploy | **Vercel** (new site) | Best React DX, per-branch preview deploys. Old Netlify/GH-Pages stays live until launch. |
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
- Fonts already chosen: **Montserrat** + **reenie beanie** + **roboto mono** + **poppins**
- Palette is dark (black bg, white text, `rgb(68,65,65)` grey accents). Keep as the base; Figma frames will refine it.
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

You're a solo dev, so keep it lightweight but professional (this *is* portfolio-worthy process).

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

### Phase 0 — Setup ⬜
- [x] Remove stale worktree (`quizzical-cray`)
- [x] Decide repo layout: **new `portfolio/` subfolder** in this repo, OR a fresh sibling repo. (Recommended: subfolder on `feat/react-migration` so the old site + new build coexist; move to root at launch.)
- [x] `npm create vite@latest portfolio -- --template react-ts`
- [x] Add Tailwind, React Router, `motion`, `lucide-react`
- [ ] Import Montserrat + Reenie Beanie + Roboto Mono + Poppins; set Tailwind theme tokens
- [ ] Connect the repo to **Vercel**, confirm a preview deploy builds ← *only Phase 0 item left*

### Phase 1 — Shell & routing ⬜
- [ ] `App.tsx` layout with `<Nav/>` + `<Outlet/>`
- [ ] Routes for `/`, `/about`, `/projects`, `/contact`
- [ ] `<Nav/>` component (replaces the 4 duplicated menu bars)
- [ ] `<Button/>` primitive

### Phase 2 — Pages (one branch each) ⬜
- [ ] Home — name title, hero image, resume button
- [ ] Projects — `projects.ts` → `<ProjectCard/>` grid
- [ ] Contact — `contact.ts` → `<ContactCard/>` (swap Font Awesome for lucide/react-icons)
- [ ] About — `about.ts` blocks

### Phase 3 — Design pass (Figma-driven) ⬜
- [ ] Pull tokens from Figma frames (colors, type scale, spacing) → `tailwind.config.ts`
- [ ] Rebuild each page responsively (kill the fixed pixel offsets)
- [ ] Add motion: page transitions, hover states, subtle entrance animations
- [ ] Mobile pass (your current site isn't responsive)

### Phase 4 — Launch ⬜
- [ ] Lighthouse / accessibility check
- [ ] Point custom domain (or GH-Pages URL) at the new build
- [ ] Merge `feat/react-migration` → `main`; move `portfolio/` to root
- [ ] Update `README.md` tech stack section
- [ ] Archive old HTML files (git history keeps them; can delete from working tree)

---



## 6. Your resumable workflow ("pick up anytime")

Tools: **Claude Code** · **Claude CLI** · **VS Code** · **Figma** · **Cosmos**

### Start-of-session ritual (2 min)
1. Open the project in **VS Code**, launch **Claude Code**.
2. Say: *"Read MIGRATION.md and tell me where I left off."* — this doc + the "Where I left off" note below = instant context.
3. `git status` and `git branch` to see your working state.
4. Pick the next unchecked box in Phase 4's checklist.

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

- **Last worked:** 2026-08-27
- **Current branch:** `feat/react-migration` (pushed to origin)
- **Done:** Phase 0 nearly complete — **all code work committed & pushed.** Scaffold (`fe5d8f1`). Tailwind + React Router + `motion` + `lucide-react` installed; Tailwind v4 wired via `@tailwindcss/vite` plugin (`vite.config.ts`) + `@import "tailwindcss"` in `src/index.css`. Fonts (Montserrat / Poppins / Roboto Mono / Reenie Beanie) + theme tokens (`--color-ink/paper/muted`, `--font-*`) set in `src/index.css` via `@theme` — committed in `e60caf5`. Verified in browser: dark bg + Tailwind utilities work.
- **Working tree:** clean 
- **Next action (do first tomorrow) — the LAST Phase 0 item: connect Vercel.**
  1. Go to vercel.com → log in with GitHub → "Add New… → Project" → import the `Portfolio-Project` repo.
  2. **Set the Root Directory to `portfolio/`** (important — the app lives in the subfolder, not the repo root). Framework preset should auto-detect **Vite**.
  3. Pick the `feat/react-migration` branch to deploy; confirm the preview build succeeds and open the URL.
  4. Tick the Vercel box above → **Phase 0 DONE** → start **Phase 1 (shell & routing)**.
- **Open questions / notes:** Authorize the **Figma connector** before Phase 3 (design pass) so frames can be pulled directly. Reminder: after editing `vite.config.ts` or installing packages, **restart the dev server** — `.tsx`/`.css` edits hot-reload, config/deps don't.
