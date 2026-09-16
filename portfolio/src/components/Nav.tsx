import { NavLink } from 'react-router-dom'

// The 4 nav sections, straight from Figma (top-right). Each is its own route.
const links = [
  { to: '/experience', label: 'experience' },
  { to: '/my-work', label: 'my work' },
  { to: '/play', label: 'play' },
  { to: '/beyond-code', label: 'beyond code' },
]

export default function Nav() {
  return (
    <>
      {/* Figma Texture feature on navbar.
          Tune: scale = how rough, baseFrequency = speck size. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="rough" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <nav className="flex justify-end gap-8 px-10 py-8 font-sans text-2xl font-extralight tracking-tight">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={{ filter: 'url(#rough)' }}
            className={({ isActive }) =>
              `transition-opacity hover:opacity-60 ${isActive ? 'underline underline-offset-4' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
