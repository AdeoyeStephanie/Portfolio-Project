import { Link, useParams } from 'react-router-dom'
import { experiences } from '../data/experiences'

// Detail page for one experience, reached from the Home cards' "learn more".
// `useParams` reads the :slug from the URL; we look it up in the data.
// Full write-up (what-i-did, tools, moments) is the next build — this is a
// clean, non-broken stub so the links work now.
export default function ExperienceDetail() {
  const { slug } = useParams()
  const exp = experiences.find((e) => e.slug === slug)

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link to="/" className="font-script text-2xl text-ink transition-colors hover:text-coral">
        ← home
      </Link>

      {exp ? (
        <div className="mt-8">
          <h1 className="font-sans text-4xl font-semibold text-ink sm:text-5xl">{exp.role}</h1>
          <p className="mt-3 font-sans text-xl font-light italic text-ink">
            {exp.org}, {exp.dates}
          </p>
          <p className="mt-2 font-sans text-base font-extralight italic text-ink">
            {`{${exp.tags.join(', ')}}`}
          </p>
          <p className="mt-8 font-sans text-lg text-ink">Full write-up coming soon.</p>
        </div>
      ) : (
        <p className="mt-8 font-sans text-lg text-ink">Hmm — that experience doesn’t exist.</p>
      )}
    </div>
  )
}
