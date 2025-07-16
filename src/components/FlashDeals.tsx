'use client'

import { Product } from '@/types'
import ProductCard from './ProductCard'
import { motion } from '@/lib/motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function FlashDeals({ products }: { products: Product[] }) {
  if (!products?.length) return null

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 space-y-6">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-gray-300">Top Deals</h2>
      </div>

      <motion.div
  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[10px] max-w-screen-xl mx-auto"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {products.map(product => (
    <motion.div key={product.id} variants={itemVariants}>
      <ProductCard product={product} />
    </motion.div>
  ))}
</motion.div>

    </section>
  )
}
