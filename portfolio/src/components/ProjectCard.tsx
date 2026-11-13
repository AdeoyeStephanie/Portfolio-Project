import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ProjectPolaroid from './ProjectPolaroid'
import type { Project } from '../data/projects'

// One project card on the my-work grid: a polaroid preview, the title, a one-line
// summary and {tags}, inside Figma's hand-drawn pen border. Clicking opens
// /my-work/<slug>. `tilt` is a Tailwind rotate class so neighbouring cards lean
// opposite ways. The border is pen-box.svg (non-scaling strokes) so its lines
// stay a constant thickness however tall the card gets.
export default function ProjectCard({ project, tilt = '' }: { project: Project; tilt?: string }) {
  const { slug, title, summary, tags, soon, card } = project
  return (
    <Link
      to={`/my-work/${slug}`}
      className="group relative flex h-full flex-col gap-4 px-6 pb-12 pt-10 transition-transform hover:-translate-y-0.5 sm:px-9"
    >
      <img
        src="/pen-box.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="flex justify-center pb-3">
        <ProjectPolaroid
          src={soon ? undefined : card.src}
          alt={card.alt ?? `${title} preview`}
          fit={card.fit}
          caption={card.caption ?? title.toLowerCase()}
          fallback={soon ? 'coming soon' : title}
          className={`w-full max-w-[460px] ${tilt}`}
        />
      </div>

      <h2 className="font-sans text-3xl text-ink sm:text-4xl">{title}</h2>
      <p className="font-sans text-lg font-light italic text-ink sm:text-xl">{summary}</p>
      <p className="font-sans text-base font-extralight italic text-ink sm:text-lg">
        {`{${tags.join(', ')}}`}
      </p>

      <span className="mt-auto flex items-center justify-end gap-1 pt-3 font-script text-3xl text-ink">
        view project
        <ArrowUpRight
          className="size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
      </span>
    </Link>
  )
}
