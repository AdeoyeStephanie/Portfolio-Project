//storing all my professional experiences on the homepage 

import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Experience } from '../data/experiences'

// One "professional experience" card. The whole card is a link to its detail
// page. The hand-drawn border is a separate layer so the #rough filter can
// distress ONLY the border, leaving the text crisp.
export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <Link
      to={`/experience/${exp.slug}`}
      className="group relative flex flex-col gap-4 px-8 py-7 transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Figma's hand-drawn pen border (46039.svg) stretched to the card.
          preserveAspectRatio="none" in the SVG lets it fit any card size. */}
      <img
        src="/exp-card-border.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div>
        <h3 className="font-sans text-2xl text-ink sm:text-3xl">{exp.role}</h3>
        <p className="mt-2 font-sans text-lg font-light italic text-ink">
          {exp.org}, {exp.dates}
        </p>
        <p className="mt-2 font-sans text-base font-extralight italic text-ink">
          {`{${exp.tags.join(', ')}}`}
        </p>
      </div>

      <span className="flex shrink-0 items-center gap-1 font-script text-2xl text-ink">
        learn more
        <ArrowUpRight
          className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
      </span>
    </Link>
  )
}
