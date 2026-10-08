// Pink band footer on home page and it's sub pages
// NOTE: lucide-react dropped brand icons, so these are text links for now —
// easy to swap for icons later (e.g. react-icons) if you want the glyphs.
import ResumeButton from './ResumeButton'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stephanie-adeoye-2a3b70291/' },
  { label: 'GitHub', href: 'https://github.com/AdeoyeStephanie' },
  { label: 'Email', href: 'mailto:stephaniemaadeoye@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 bg-coral/25 px-8 py-8 font-sans text-sm text-ink sm:px-12">
      <p>made with claude code, figma, and a lot of matcha lattes</p>
      <div className="flex items-center gap-5">
        {socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            className="transition-colors hover:text-coral"
          >
            {label}
          </a>
        ))}
        <ResumeButton variant="pill" />
      </div>
    </footer>
  )
}
