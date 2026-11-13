// Section heading used in the overlays and project pages: a small ☆ followed by
// the title in Reenie Beanie.
export default function StarHeading({
  children,
  as: Tag = 'h3',
}: {
  children: React.ReactNode
  as?: 'h2' | 'h3'
}) {
  return (
    <Tag className="font-script text-ink">
      <span className="text-4xl">☆</span>
      <span className="text-5xl sm:text-6xl"> {children}</span>
    </Tag>
  )
}
