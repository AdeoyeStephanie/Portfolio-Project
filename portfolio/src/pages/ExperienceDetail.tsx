import { Navigate, useParams } from 'react-router-dom'

// The experience detail is now an OVERLAY on Home (driven by ?exp=<slug>), not a
// standalone page. This route only exists to redirect any old/shared
// /experience/:slug links to the equivalent overlay on Home.
export default function ExperienceDetail() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/?exp=${slug}` : '/'} replace />
}
