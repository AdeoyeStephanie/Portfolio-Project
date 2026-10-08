import { ArrowUpRight } from 'lucide-react'

// Link to the resume PDF (served from /public). Two looks from Figma:
//   • "full" — the bordered "see the full resume" button under the experiences
//   • "pill" — the compact "resume" pill in the footer
// Both open the PDF in a new tab to view it. The path lives here once, so
// swapping in a newer resume is a single edit (and the filename stays stable).
const RESUME_HREF = '/Stephanie_Adeoye_Resume.pdf'

export default function ResumeButton({
  variant = 'full',
  className = '',
}: {
  variant?: 'full' | 'pill'
  className?: string
}) {
  const full = variant === 'full'
  return (
    <a
      href={RESUME_HREF}
      target="_blank"
      rel="noreferrer"
      aria-label="View Stephanie’s resume (opens in a new tab)"
      className={`group inline-flex items-center border-2 border-ink bg-paper font-script text-ink transition-colors hover:bg-ink hover:text-paper ${
        full ? 'gap-3 rounded-xl px-8 py-3 text-3xl' : 'gap-2 rounded-full px-5 py-2 text-2xl'
      } ${className}`}
    >
      {full ? 'see the full resume' : 'resume'}
      <ArrowUpRight
        className={`${full ? 'size-6' : 'size-5'} transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
        strokeWidth={1.5}
      />
    </a>
  )
}
