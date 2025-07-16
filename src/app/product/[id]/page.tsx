'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { motion } from '@/lib/motion'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const realParams = React.use(params)
  const id = realParams.id

  const [product, setProduct] = React.useState<Product | null>(null)
  const [related, setRelated] = React.useState<Product[]>([])
  const [added, setAdded] = React.useState(false)
  const add = useCartStore(state => state.add)
  const router = useRouter()

  React.useEffect(() => {
    if (!id) return

    async function fetchProducts() {
      try {
        const prodRes = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!prodRes.ok) throw new Error('Failed to fetch product')
        const prodData: Product = await prodRes.json()
        setProduct(prodData)

        const catRes = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(prodData.category)}`)
        if (!catRes.ok) throw new Error('Failed to fetch category products')
        let categoryProducts: Product[] = await catRes.json()
        categoryProducts = categoryProducts.filter(p => p.id !== prodData.id)

        if (categoryProducts.length < 4) {
          const allRes = await fetch('https://fakestoreapi.com/products')
          if (!allRes.ok) throw new Error('Failed to fetch all products')
          const allProducts: Product[] = await allRes.json()
          const excludeIds = new Set([prodData.id, ...categoryProducts.map(p => p.id)])
          const remaining = allProducts.filter(p => !excludeIds.has(p.id))
          const shuffledRemaining = remaining.sort(() => 0.5 - Math.random())
          const toAdd = shuffledRemaining.slice(0, 4 - categoryProducts.length)
          categoryProducts = [...categoryProducts, ...toAdd]
        }

        const finalRelated = categoryProducts.sort(() => 0.5 - Math.random()).slice(0, 4)
        setRelated(finalRelated)
      } catch (e) {
        console.error('Error loading products:', e)
        setRelated([])
      }
    }

    fetchProducts()
  }, [id])

  if (!product) return <p className="p-6 text-center text-gray-400">Loading...</p>

  const handleAddToCart = () => {
    add({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#101010] min-h-screen max-w-6xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-12 text-[#ddd]"
    >
      <section className="flex flex-col md:flex-row gap-10">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex justify-center"
        >
          <div className="bg-white rounded-lg p-4 w-full max-w-[500px] sm:max-w-[550px] md:max-w-[600px] flex justify-center items-center">
            <div className="relative w-full max-w-[400px] h-[300px] sm:h-[360px] md:h-[400px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 70vw, 600px"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold mb-5 leading-tight text-white">
              {product.title}
            </h1>
            <p className="text-[clamp(0.9rem,2.5vw,1.1rem)] text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>
            <p className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white mb-8">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            animate={added ? { scale: [1, 1.05, 1], backgroundColor: '#6b21a8' } : {}}
            transition={{ duration: 0.3 }}
            className={`py-4 px-6 rounded-lg font-semibold text-[clamp(1rem,2vw,1.2rem)] text-white transition duration-200 ease-in-out
              ${added
              ? 'bg-purple-800'
              : 'bg-gradient-to-r from-violet-600 via-purple-700 to-purple-800 hover:brightness-110'}
            `}
          >
            {added ? 'Added to Cart' : 'Add to Cart'}
          </motion.button>
        </motion.div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold mb-6 text-white sm:text-left text-center">
            Products You Might Like
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-[10px]"
          >
            {related.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onClick={() => router.push(`/product/${item.id}`)}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer flex flex-col items-center justify-between h-[300px] transition-transform"
              >
                <div className="w-full h-[150px] relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="100%"
                  />
                </div>
                <h3 className="mt-4 text-center text-[clamp(0.85rem,2.5vw,1rem)] font-semibold line-clamp-2 h-[42px] text-[#101010]">
                  {item.title}
                </h3>
                <p className="mt-3 font-bold text-[#101010] text-[clamp(0.95rem,2vw,1.1rem)]">
                  ${item.price.toFixed(2)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </motion.main>
  )
}
