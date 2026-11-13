// The hand-drawn horizontal rule from Figma, centered. `className` sets the spacing.
export default function Divider({ className = 'my-16' }: { className?: string }) {
  return <img src="/divider.svg" alt="" aria-hidden className={`mx-auto w-[420px] max-w-full ${className}`} />
}
