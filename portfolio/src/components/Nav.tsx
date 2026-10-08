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

export default function Nav() {
  return (
    <nav className="flex flex-wrap justify-end gap-8 px-10 py-8 font-sans text-2xl tracking-tight">
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          style={{ filter: 'url(#rough)' }} // distress texture (filter defined once in App)
          className={({ isActive }) =>
            `transition-colors hover:font-bold ${isActive ? 'text-coral' : 'font-extralight'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
