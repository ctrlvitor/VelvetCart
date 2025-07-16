'use client'

import { motion } from '@/lib/motion'
import FlashDeals from '@/components/FlashDeals'
import CategorySection from '@/components/CategorySection'
import { Product } from '@/types'

interface Props {
  products: Product[]
  categories: { title: string; list: Product[] }[]
}

export default function ClientWrapper({ products, categories }: Props) {
  const banners = Array.from({ length: 9 }, (_, i) => `/assets/asset-${i + 1}.jpg`)

  return (
    <motion.main
      className="bg-gray-100 px-4 sm:px-6 md:px-12 lg:px-20 py-8 space-y-16 max-w-[1440px] mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <FlashDeals products={products} />

      <div className="flex flex-col gap-16">
        {categories.map((category, i) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5, ease: 'easeOut' }}
            className="w-full"
          >
            <CategorySection
              title={category.title}
              products={category.list}
              banner={banners[i % banners.length]}
            />
          </motion.section>
        ))}
      </div>
    </motion.main>
  )
}
