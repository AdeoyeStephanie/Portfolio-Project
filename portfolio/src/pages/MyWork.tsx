// src/pages/MyWork.tsx — the project grid. Content lives in src/data/projects.ts.
import Divider from '../components/Divider'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

// Neighbouring cards lean opposite ways (checkerboard on the 2-column grid).
// Full class names so Tailwind can see them.
const tilts = ['-rotate-[1.5deg]', 'rotate-[1.5deg]', 'rotate-[1.5deg]', '-rotate-[1.5deg]']

export default function MyWork() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6">
        <Divider className="mb-10 mt-2" />
        <h1 className="text-center font-script text-6xl text-ink sm:text-7xl">things i’ve built</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-lg font-light italic text-ink sm:text-xl">
          side projects, experiments, and a few things that started as a crazy idea
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} tilt={tilts[i % tilts.length]} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
