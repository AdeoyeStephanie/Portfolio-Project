// The experience OVERLAY — opens over Home when a professional-experience card
// is clicked. Built from the Figma "experience overlay" frames (364:1837 etc).
//
// It is URL-driven: the open state lives in the `?exp=<slug>` search param, so
// each overlay is linkable, shareable, and the browser back button closes it.
// Home just renders <ExperienceModal /> once; the card links set the param.
//
// What makes it a real modal (not just a floating div):
//   • rendered through a portal into <body>, so it escapes page overflow/stacking
//   • scrim click, × button, and Esc all close it
//   • ← / → arrows (and arrow keys) move between experiences, wrapping around
//   • background scroll is locked while open; the modal itself scrolls
//   • focus is moved in on open, trapped with Tab, and restored on close
//   • role="dialog" + aria-modal + aria-labelledby for screen readers
//   • a subtle fade/scale via `motion`, skipped under prefers-reduced-motion

import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Experience, Moment } from '../data/experiences'

export default function ExperienceModal({ experiences }: { experiences: Experience[] }) {
  const [params, setParams] = useSearchParams()
  const activeSlug = params.get('exp')
  const index = experiences.findIndex((e) => e.slug === activeSlug)
  const open = index >= 0
  const exp = open ? experiences[index] : null

  const dialogRef = useRef<HTMLDivElement>(null)
  // Remember what was focused before opening so we can restore it on close.
  const lastFocused = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    // Drop just the `exp` param; keep anything else in the query string.
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('exp')
        return next
      },
      { replace: true },
    )
  }, [setParams])

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index < 0) return
      // Wrap around: next after the last loops to the first, and vice-versa.
      const nextIndex = (index + dir + experiences.length) % experiences.length
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('exp', experiences[nextIndex].slug)
          return next
        },
        { replace: true },
      )
    },
    [index, experiences, setParams],
  )

  // Keyboard: Esc closes, ← / → navigate between experiences.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, go])

  // Lock background scroll while the overlay is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Move focus into the dialog on open; restore it to the trigger on close.
  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement as HTMLElement
    dialogRef.current?.focus()
    return () => lastFocused.current?.focus()
  }, [open])

  // Jump back to the top when switching experiences, so prev/next always lands
  // on the new role's header rather than wherever you'd scrolled to.
  useEffect(() => {
    if (open) dialogRef.current?.scrollTo({ top: 0 })
  }, [activeSlug, open])

  // Trap Tab focus inside the dialog so the background stays inert.
  function onKeyDownTrap(e: React.KeyboardEvent) {
    if (e.key !== 'Tab' || !dialogRef.current) return
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const reduce = useReducedMotion()

  return createPortal(
    <AnimatePresence>
      {open && exp && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Scrim — click anywhere outside the card to close. */}
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-black/45"
          />

          {/* ← / → navigation, pinned to the viewport edges, vertically centered. */}
          <ArrowButton side="left" label="Previous experience" onClick={() => go(-1)} />
          <ArrowButton side="right" label="Next experience" onClick={() => go(1)} />

          {/* The card itself (scrolls). stopPropagation isn't needed because the
              scrim is a sibling button, not a wrapping parent. */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exp-modal-role"
            tabIndex={-1}
            onKeyDown={onKeyDownTrap}
            initial={reduce ? false : { opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 my-[3vh] max-h-[94vh] w-[min(1360px,92vw)] overflow-y-auto overflow-x-clip rounded-[28px] bg-paper px-6 py-10 shadow-[0px_24px_60px_0px_rgba(0,0,0,0.3)] outline-none sm:px-12 sm:py-12"
          >
            {/* Close × */}
            <button
              type="button"
              onClick={close}
              aria-label="Close experience"
              className="absolute right-6 top-6 z-10 flex size-11 items-center justify-center rounded-full border border-ink bg-paper text-ink shadow-[0px_6px_16px_0px_rgba(0,0,0,0.18)] transition-colors hover:bg-ink hover:text-paper sm:right-8 sm:top-8"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>

            {/* ── HEADER ── */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <p className="font-sans text-base font-light text-neutral-500">
                  experience {String(index + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
                </p>
                <h2
                  id="exp-modal-role"
                  className="mt-2 font-sans text-[clamp(2rem,5vw,4.5rem)] font-semibold italic leading-[1.05] tracking-tight text-ink [text-shadow:0px_4px_4px_var(--color-coral)]"
                >
                  {exp.role}
                </h2>
                <p className="mt-5 font-sans text-2xl font-light italic text-ink">
                  {exp.org}, {exp.dates}
                </p>
                <p className="mt-3 font-sans text-xl font-extralight italic text-ink">
                  {`{${exp.tags.join(', ')}}`}
                </p>
                <p className="mt-6 max-w-2xl font-script text-3xl leading-tight text-ink">
                  {exp.oneLiner}
                </p>
              </div>

              <ModalPolaroid moment={exp.hero} className="-rotate-4 shrink-0 self-center lg:self-start" width={360} />
            </div>

            {/* ── AT A GLANCE ── */}
            <GlanceBox glance={exp.glance} />

            {/* ── WHAT I DID + TOOLS ── */}
            <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:justify-between">
              <div className="min-w-0 flex-1">
                <Heading>what i did</Heading>
                <p className="mt-6 max-w-2xl font-sans text-2xl font-light leading-relaxed text-ink">
                  {exp.whatIDid.paragraph}
                </p>
                <ul className="mt-6 space-y-2 font-sans text-xl font-light text-ink">
                  {exp.whatIDid.highlights.map((h, i) => (
                    <li key={i}>→&nbsp;&nbsp;{h}</li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0 rotate-1 self-start rounded-[20px] bg-[#faf5f0] px-7 py-6">
                <p className="font-script text-3xl text-ink">tools i used</p>
                <p className="mt-2 font-sans text-lg font-light leading-[1.7] text-ink">
                  {exp.tools.join('  ·  ')}
                </p>
              </div>
            </div>

            {/* ── SKILLS ── */}
            <div className="mt-14">
              <Heading>skills i picked up</Heading>
              <div className="mt-6 flex flex-wrap gap-3">
                {exp.skills.technical.map((s, i) => (
                  <Chip key={`t-${i}`}>{s}</Chip>
                ))}
                {exp.skills.soft.map((s, i) => (
                  <Chip key={`s-${i}`} soft>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            {/* ── MOMENTS ── */}
            {exp.moments.length > 0 && (
              <div className="mt-14">
                <Heading>moments</Heading>
                <p className="mt-2 font-sans text-xl font-light italic text-neutral-500">
                  a few snapshots from the role
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-6 sm:justify-start">
                  {exp.moments.slice(0, 4).map((m, i) => (
                    <ModalPolaroid
                      key={i}
                      moment={m}
                      width={240}
                      className={['rotate-4', '-rotate-3', 'rotate-2', '-rotate-5'][i % 4]}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── NOTE TO SELF ── */}
            <NoteBox note={exp.note} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* ─────────────────────────── small building blocks ─────────────────────────── */

// Section heading: "☆ <text>" in Reenie Beanie, star smaller than the words.
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-script text-ink">
      <span className="text-4xl">☆</span>
      <span className="text-5xl sm:text-6xl"> {children}</span>
    </h3>
  )
}

// A coral-outlined pill. Soft skills get a tinted fill (matches Figma).
function Chip({ children, soft = false }: { children: React.ReactNode; soft?: boolean }) {
  return (
    <span
      className={`rounded-full border border-coral px-5 py-2.5 font-sans text-lg text-coral ${
        soft ? 'bg-[#fcede8]' : ''
      }`}
    >
      {children}
    </span>
  )
}

// A polaroid for the overlay. Shows the photo, or a coloured block placeholder
// (`tint`) when there's no photo yet. `width` sizes it; `className` tilts it.
function ModalPolaroid({
  moment,
  width,
  className = '',
}: {
  moment: Moment
  width: number
  className?: string
}) {
  return (
    <figure
      className={`flex flex-col gap-3 bg-paper p-4 shadow-[0px_6px_20px_0px_rgba(0,0,0,0.2)] ${className}`}
      style={{ width }}
    >
      {moment.src ? (
        <img src={moment.src} alt={moment.caption} className="aspect-square w-full object-cover" />
      ) : (
        <div className="aspect-square w-full" style={{ backgroundColor: moment.tint ?? '#e5e5e5' }} aria-hidden />
      )}
      <figcaption className="text-center font-script text-2xl text-ink">{moment.caption}</figcaption>
    </figure>
  )
}

// The hand-drawn "at a glance" box: an open-ended SVG rule behind 4 facts.
function GlanceBox({ glance }: { glance: Experience['glance'] }) {
  const items = [
    ['ROLE', glance.role],
    ['TEAM', glance.team],
    ['WHERE', glance.where],
    ['WHEN', glance.when],
  ] as const
  return (
    <div className="relative mt-12 px-6 py-8 sm:px-10">
      <img src="/glance-box.svg" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <dl className="relative grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt className="font-sans text-xs tracking-[0.14em] text-neutral-500">{label}</dt>
            <dd className="mt-2 font-sans text-xl font-light text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// The hand-drawn "a note to self" box with the handwritten coral quote.
function NoteBox({ note }: { note: string }) {
  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <p className="font-script text-2xl text-neutral-500">a note to self</p>
      <div className="relative mt-2 px-8 py-10">
        <img src="/note-box.svg" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
        <p className="relative text-center font-script text-4xl text-coral">“{note}”</p>
      </div>
    </div>
  )
}

// A round nav arrow pinned to a viewport edge, vertically centered.
function ArrowButton({
  side,
  label,
  onClick,
}: {
  side: 'left' | 'right'
  label: string
  onClick: () => void
}) {
  const Icon = side === 'left' ? ArrowLeft : ArrowRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-20 flex size-13 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-paper text-ink shadow-[0px_6px_16px_0px_rgba(0,0,0,0.18)] transition-colors hover:bg-ink hover:text-paper ${
        side === 'left' ? 'left-3 sm:left-5' : 'right-3 sm:right-5'
      }`}
    >
      <Icon className="size-5" strokeWidth={1.5} />
    </button>
  )
}
