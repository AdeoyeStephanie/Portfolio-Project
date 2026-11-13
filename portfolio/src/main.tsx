import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import MyWork from './pages/MyWork.tsx'
import Play from './pages/Play.tsx'
import BeyondCode from './pages/BeyondCode.tsx'
import ExperienceDetail from './pages/ExperienceDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App = layout (Nav + Outlet). /experience is gone as a nav item —
            experience now lives on Home; each role opens a detail page. */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="my-work" element={<MyWork />} />
          <Route path="play" element={<Play />} />
          <Route path="beyond-code" element={<BeyondCode />} />
          <Route path="experience/:slug" element={<ExperienceDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
