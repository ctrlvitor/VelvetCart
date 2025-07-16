import Image from 'next/image'

export default function PromoBanner({
  image,
  title = 'Exclusive Offer!',
}: {
  image: string
  title?: string
}) {
  if (!image) return null

  return (
    <div className="relative w-full h-40 sm:h-56 my-8 rounded-lg overflow-hidden">
      <Image
        src={image}
        alt="Promo Banner"
        fill
        className="object-cover brightness-75"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-xl sm:text-3xl font-bold bg-black/40 px-4 py-2 rounded">
          {title}
        </h2>
      </div>
    </div>
  )
}
