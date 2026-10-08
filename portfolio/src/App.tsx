import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

export default function App() {
  return (
    <div className="min-h-svh">
      {/* Global "rough" filter — defined ONCE here, used by the nav text and the
          experience-card borders. Turbulence noise displaces edges to mimic the
          Figma hand-drawn/distressed look. Tune: scale = roughness, baseFrequency = speck size. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="rough" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <Nav />
      <Outlet />
    </div>
  )
}
