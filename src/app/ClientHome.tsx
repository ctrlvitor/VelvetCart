'use client'

import React, { useEffect, useState } from 'react'
import { motion } from '@/lib/motion'
import { useCartStore } from '../store/cartStore'
import { Product } from '../types'
import { formatPrice } from '../utils/formatPrice'

export default function ClientHome() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const cart = useCartStore()

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products')
      const data: Product[] = await res.json()
      setProducts(data)

      const cats = Array.from(new Set(data.map(p => p.category)))
      setCategories(cats)
    }
    fetchProducts()
  }, [])

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory)

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <header className="mb-6 flex flex-wrap gap-3 justify-center sm:justify-start">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full font-Raleway font-semibold transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-Raleway font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </header>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map(product => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(128,0,128,0.3)' }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="object-contain h-48 w-full p-4"
              loading="lazy"
            />
            <div className="flex-1 px-4 pb-4 flex flex-col justify-between">
              <h3
                title={product.title}
                className="font-Raleway font-semibold text-gray-800 line-clamp-2 mb-2"
              >
                {product.title}
              </h3>
              <p className="font-Quintessential text-lg text-purple-600 mb-4">
                {formatPrice(product.price)}
              </p>
              <button
                onClick={() => cart.add(product)}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:brightness-110 transition"
              >
                Add to Cart
              </button>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  )
}
