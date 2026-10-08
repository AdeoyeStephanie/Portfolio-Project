//portfolio home/landing page
import Polaroid from '../components/Polaroid'
import ExperienceCard from '../components/ExperienceCard'
import Footer from '../components/Footer'
import { experiences } from '../data/experiences'


export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6">
        {/* ── HERO ── */}
        <section className="flex flex-col items-center gap-10 pt-4 md:flex-row md:items-start md:justify-between">
          <div className="order-2 flex-1 md:order-1">
            <h1 className="whitespace-nowrap font-sans text-[clamp(2rem,6vw,5rem)] font-semibold italic tracking-tight text-ink [text-shadow:0px_4px_4px_var(--color-coral)]">
              Stephanie Adéoyè
            </h1>
            <p className="mt-3 font-sans text-lg font-extralight italic text-ink underline decoration-1 underline-offset-4">
              /ˈstɛfəni/ + ah-DAY-oh-YEH
            </p>
            <p className="mt-8 max-w-xl font-script text-3xl leading-tight text-ink">
              aspiring design engineer exploring the intersection of code, design and artificial
              intelligence models
            </p>
          </div>
          <img
            src="/headshot.jpg"
            alt="Stephanie Adéoyè"
            className="order-1 w-[260px] rounded-[2.5rem] object-cover md:order-2 lg:w-[340px]"
          />
        </section>

        <Divider />

        {/* ── BIO ── */}
        <section className="flex flex-col items-start gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-md space-y-5 font-sans text-lg leading-relaxed text-ink">
            <p>
              Born and raised in Ilorin Nigeria, i’m a lover of the arts who found herself in STEM
              classes before i could nurture that passion.
            </p>
            <p>
              I like to call myself an engineer who loves to design. Most of my projects start off
              from a crazy idea i came up with randomly and the part that most excites me is wire
              framing and bringing said wireframes to life through code.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 self-center sm:flex-row lg:self-start">
            <Polaroid
              src="/polaroid-fall.jpg"
              alt="A candid photo of Stephanie in fall 2026"
              caption="a random photo of me in fall 2026"
              className="-rotate-3 sm:mt-8"
            />
            <Polaroid
              src="/polaroid-desk.jpg"
              alt="Stephanie’s desk setup with ambient lighting"
              caption="i’m obsessed with ambient lighting on my desk"
              className="rotate-2"
            />
          </div>
        </section>

        <Divider />

        {/* ── PROFESSIONAL EXPERIENCES ── */}
        <section>
          <h2 className="text-center font-script text-6xl text-ink sm:text-7xl">
            professional experiences
          </h2>
          <div className="mt-10 space-y-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.slug} exp={exp} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

// The hand-drawn horizontal rule from Figma, centered.
function Divider() {
  return <img src="/divider.svg" alt="" aria-hidden className="mx-auto my-16 w-[420px] max-w-full" />
}
