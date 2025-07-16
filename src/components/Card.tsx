'use client'

import Image from 'next/image'
import { motion } from '@/lib/motion'
import { useCartStore } from '@/store/cartStore'

type Product = { id: number; title: string; price: number; image: string }
type Props = { product: Product }

export default function Card({ product }: Props) {
  const add = useCartStore((s) => s.add)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col gap-3 border rounded-xl p-4 bg-white shadow hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-52">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="100%"
        />
      </div>
      <h2 className="text-sm font-semibold line-clamp-2">{product.title}</h2>
      <p className="text-lg font-bold text-green-600">$ {product.price.toFixed(2)}</p>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => add(product)}
        className="mt-auto bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-2 rounded-md"
      >
        Add to Cart
      </motion.button>
    </motion.div>
  )
}
