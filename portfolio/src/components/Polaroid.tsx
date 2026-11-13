// A photo in a white "polaroid" frame with a handwritten (Reenie Beanie) caption.
// `className` lets the caller tilt/space each one for the scrapbook feel.
type PolaroidProps = {
  src: string
  alt: string
  caption: string
  className?: string
}

export default function Polaroid({ src, alt, caption, className = '' }: PolaroidProps) {
  return (
    <figure
      className={`flex w-[240px] flex-col gap-3 bg-paper p-4 shadow-[0px_6px_20px_0px_rgba(0,0,0,0.2)] ${className}`}
    >
      <img src={src} alt={alt} className="aspect-[3/4] w-full object-cover" />
      <figcaption className="text-center font-script text-2xl text-ink">
        {caption}
      </figcaption>
    </figure>
  )
}
