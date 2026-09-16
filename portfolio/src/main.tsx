import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Experience from './pages/Experience.tsx'
import MyWork from './pages/MyWork.tsx'
import Play from './pages/Play.tsx'
import BeyondCode from './pages/BeyondCode.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="experience" element={<Experience />} />
          <Route path="my-work" element={<MyWork />} />
          <Route path="play" element={<Play />} />
          <Route path="beyond-code" element={<BeyondCode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)