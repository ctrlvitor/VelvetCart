'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from '@/lib/motion'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams?.get('query') || ''
  const query = queryParam.toLowerCase()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) {
      setProducts([])
      setLoading(false)
      return
    }

    setLoading(true)
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(p =>
          p.title.toLowerCase().includes(query)
        )
        setProducts(filtered)
      })
      .finally(() => setLoading(false))
  }, [query])

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
        Search results for{' '}
        <span className="inline-block bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent">
          "{query}"
        </span>
      </h1>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600 text-base sm:text-lg md:text-xl">No results found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </motion.main>
  )
}
