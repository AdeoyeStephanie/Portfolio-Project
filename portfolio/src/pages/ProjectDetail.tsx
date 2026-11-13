// /my-work/:slug — one project's page. Content lives in src/data/projects.ts;
// every section below hides itself when its data is empty.
import { Link, useParams } from 'react-router-dom'
import Divider from '../components/Divider'
import Footer from '../components/Footer'
import LinkButton from '../components/LinkButton'
import ProjectPolaroid from '../components/ProjectPolaroid'
import StarHeading from '../components/StarHeading'
import { projects } from '../data/projects'

const shotTilts = ['-rotate-3', 'rotate-0', 'rotate-3']

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
          <h1 className="font-script text-6xl text-ink">project not found</h1>
          <p className="mt-4 font-sans text-lg font-light italic text-ink">
            that link doesn’t match anything on the shelf.
          </p>
          <Link
            to="/my-work"
            className="mt-8 py-2 font-script text-3xl text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-coral"
          >
            ← back to my work
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const { title, tagline, tags, hero, idea, tools, build, buildPhoto, screenshots, links } = project
  const shots = screenshots.filter((s) => s.src).slice(0, 3)
  const hasIdea = idea.length > 0 || tools.length > 0
  const hasBuild = build.length > 0 || !!buildPhoto.src
  const hasLinks = !!(links.github || links.live)
  const hasSections = hasIdea || hasBuild || shots.length > 0 || hasLinks

  return (
    <>
      <div className="mx-auto max-w-6xl px-6">
        <Link
          to="/my-work"
          className="-my-2 inline-block py-2 font-script text-3xl text-ink underline-offset-4 transition-colors hover:text-coral hover:underline"
        >
          ← back to my work
        </Link>

        {/* ── HEADER ── */}
        <header className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="font-sans text-[clamp(2.75rem,8vw,6rem)] font-semibold italic leading-none tracking-tight text-ink [text-shadow:0px_4px_4px_var(--color-coral)]">
              {title}
            </h1>
            <p className="mt-6 max-w-xl font-sans text-2xl font-light italic text-ink">{tagline}</p>
            <p className="mt-3 font-sans text-lg font-extralight italic text-ink">{`{${tags.join(', ')}}`}</p>
          </div>
          <ProjectPolaroid
            {...hero}
            shape="square"
            className="w-[300px] shrink-0 -rotate-4 self-center sm:w-[340px] lg:self-start"
          />
        </header>

        {hasSections && <Divider className="my-16" />}

        <div className="space-y-24">
          {/* ── THE IDEA + TOOLS ── */}
          {hasIdea && (
            <section className="flex flex-col gap-10 lg:flex-row lg:justify-between">
              {idea.length > 0 && (
                <div className="min-w-0 flex-1">
                  <StarHeading as="h2">the idea</StarHeading>
                  <div className="mt-6 max-w-2xl space-y-5 font-sans text-xl font-light leading-relaxed text-ink">
                    {idea.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              {tools.length > 0 && (
                <div className="shrink-0 rotate-1 self-start rounded-[20px] bg-[#faf5f0] px-7 py-6">
                  <p className="font-script text-3xl text-ink">tools i used</p>
                  <p className="mt-2 font-sans text-lg font-light leading-[1.7] text-ink">
                    {tools.join('  ·  ')}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* ── HOW IT CAME TOGETHER ── */}
          {hasBuild && (
            <section className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              {build.length > 0 && (
                <div className="min-w-0 flex-1">
                  <StarHeading as="h2">how it came together</StarHeading>
                  <div className="mt-6 max-w-2xl space-y-5 font-sans text-xl font-light leading-relaxed text-ink">
                    {build.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              <ProjectPolaroid
                {...buildPhoto}
                className="w-full max-w-[440px] shrink-0 rotate-2 self-center lg:self-start"
              />
            </section>
          )}

          {/* ── SCREENSHOTS ── */}
          {shots.length > 0 && (
            <section>
              <StarHeading as="h2">screenshots</StarHeading>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
                {shots.map((shot, i) => (
                  <ProjectPolaroid
                    key={i}
                    {...shot}
                    className={`w-full max-w-[360px] md:w-[calc((100%-5rem)/3)] md:max-w-none ${shotTilts[i % shotTilts.length]}`}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── LINKS ── */}
          {hasLinks && (
            <div className="flex flex-wrap justify-center gap-6">
              {links.github && <LinkButton href={links.github}>view on github</LinkButton>}
              {links.live && <LinkButton href={links.live}>try it live</LinkButton>}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
