import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

export default function App() {
  return (
    <div className="min-h-svh">
      <Nav />
      <main className="px-10 py-6">
        <Outlet />
      </main>
    </div>
  )
}