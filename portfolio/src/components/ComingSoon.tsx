import { Link } from 'react-router-dom'
import Footer from './Footer'

// Placeholder screen for pages that aren't built yet (my work / play / beyond
// code). Keeps the nav honest at launch — a visitor who clicks through lands on
// an intentional, on-brand "coming soon" instead of a broken-looking stub.
// Swap each page's <ComingSoon/> for the real build when it's ready.
export default function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="font-sans text-sm font-extralight uppercase tracking-[0.3em] text-neutral-500">
          coming soon
        </p>
        <h1 className="mt-6 font-sans text-[clamp(2.5rem,8vw,5rem)] font-semibold italic tracking-tight text-ink [text-shadow:0px_4px_4px_var(--color-coral)]">
          {title}
        </h1>
        <p className="mt-8 max-w-xl font-script text-3xl leading-tight text-ink">{note}</p>
        <Link
          to="/"
          className="mt-10 font-script text-2xl text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-coral"
        >
          ← back home
        </Link>
      </div>
      <Footer />
    </>
  )
}
