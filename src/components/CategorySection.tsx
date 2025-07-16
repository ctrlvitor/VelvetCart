'use client'

import { motion } from '@/lib/motion'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import Image from 'next/image'

interface Props {
  title: string
  products: Product[]
  banner?: string
}

export default function CategorySection({ title, products, banner }: Props) {
  if (!products?.length) return null

  return (
    <section className="space-y-5 w-full px-4 sm:px-6 md:px-8 my-30">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden max-w-screen-xl mx-auto"
      >
        {banner ? (
          <Image
            src={banner}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1280px) 1280px, 100vw"
            priority
          />
        ) : (
          <div className="bg-gray-300 w-full h-full" />
        )}

        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-20">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-md">
            {title}
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[10px] max-w-screen-xl mx-auto"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  )
}
