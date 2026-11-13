// A polaroid for the my-work pages: white frame, soft shadow, handwritten caption.
// Shows the photo when there is one. Otherwise: if `fallback` is given it shows a
// blush tile with that text (used by the grid cards); if not, it renders nothing,
// so an unfilled slot never leaves an empty box on the page.
type ProjectPolaroidProps = {
  src?: string
  alt?: string
  caption?: string
  fallback?: string
  /** 'contain' shows the whole image (logos); 'cover' (default) fills and crops. */
  fit?: 'cover' | 'contain'
  shape?: 'landscape' | 'square'
  /** Width + tilt come from the caller, e.g. "w-full max-w-md -rotate-3". */
  className?: string
}

export default function ProjectPolaroid({
  src,
  alt,
  caption,
  fallback,
  fit = 'cover',
  shape = 'landscape',
  className = '',
}: ProjectPolaroidProps) {
  if (!src && !fallback) return null
  const ratio = shape === 'square' ? 'aspect-square' : 'aspect-[16/10]'
  return (
    <figure
      className={`flex flex-col gap-3 bg-paper p-4 shadow-[0px_6px_20px_0px_rgba(0,0,0,0.2)] ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? caption ?? ''}
          className={`w-full ${ratio} ${fit === 'contain' ? 'bg-[#faf5f0] object-contain p-6' : 'object-cover'}`}
        />
      ) : (
        <div className={`flex w-full items-center justify-center bg-coral/25 ${ratio}`}>
          <span className="px-4 text-center font-script text-5xl text-coral">{fallback}</span>
        </div>
      )}
      {caption && (
        <figcaption className="text-center font-script text-2xl text-ink">{caption}</figcaption>
      )}
    </figure>
  )
}
