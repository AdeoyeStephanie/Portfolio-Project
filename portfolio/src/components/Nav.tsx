import { NavLink } from 'react-router-dom'

// Nav now matches the current Figma: home · my work · play · beyond code.
// "home" (→ /) fixes the "no way back" problem. The active link is bold,
// others extralight — exactly as the design shows.
const links = [
  { to: '/', label: 'home', end: true },
  { to: '/my-work', label: 'my work' },
  { to: '/play', label: 'play' },
  { to: '/beyond-code', label: 'beyond code' },
]

// Below `sm` the nav shrinks to stay on one line and uses the softer #rough-sm
// texture so the small text stays legible; from `sm` up it's the full Figma look.
// The -m / p pairs on each link grow the tap area (~44px) without moving anything.
export default function Nav() {
  return (
    <nav className="flex flex-wrap justify-end gap-4 px-4 py-6 font-sans text-base tracking-tight sm:gap-8 sm:px-10 sm:py-8 sm:text-2xl">
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `-mx-1 -my-2.5 px-1 py-2.5 transition-colors [filter:url(#rough-sm)] hover:font-bold sm:[filter:url(#rough)] ${
              isActive ? 'text-coral' : 'font-extralight'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
