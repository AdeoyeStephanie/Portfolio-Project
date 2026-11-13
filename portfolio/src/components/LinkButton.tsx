import { ArrowUpRight } from 'lucide-react'

// The bordered outline button (same look as "see the full resume") for external
// links, e.g. "view on github ↗". Opens in a new tab.
export default function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 rounded-xl border-2 border-ink bg-paper px-8 py-3 font-script text-3xl text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      {children}
      <ArrowUpRight
        className="size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
      />
    </a>
  )
}
