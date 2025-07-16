import Image from 'next/image'

export default function HeroCarousel({ images }: { images: string[] }) {
  return (
    <div className="relative w-full h-[300px] sm:h-[500px] overflow-hidden mb-8">
      <div className="flex w-full h-full animate-slide">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Hero ${i}`}
            width={1200}
            height={500}
            className="object-cover w-full h-full flex-shrink-0"
          />
        ))}
      </div>
    </div>
  )
}
