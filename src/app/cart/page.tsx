'use client'

import { useCartStore } from '@/store/cartStore'
import { motion, AnimatePresence } from '@/lib/motion'
import { useState } from 'react'

export default function CartPage() {
  const items = useCartStore(state => state.items)
  const increment = useCartStore(state => state.increment)
  const decrement = useCartStore(state => state.decrement)
  const remove = useCartStore(state => state.remove)
  const clear = useCartStore(state => state.clear)

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  const [clearing, setClearing] = useState(false)

  const handleClear = () => {
    setClearing(true)
    setTimeout(() => {
      clear()
      setClearing(false)
    }, 300)
  }

  if (items.length === 0)
    return (
      <section className="italic flex flex-col items-center justify-center min-h-[60vh] text-gray-500 font-[Raleway] text-lg sm:text-xl px-4">
        <p>Your cart is empty.</p>
      </section>
    )

  return (
    <section className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-[Raleway] font-extrabold text-3xl sm:text-4xl tracking-tight"
      >
        Shopping Cart
      </motion.h1>

      <ul className="space-y-6">
        <AnimatePresence initial={false}>
          {items.map(item => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-lg shadow-md p-4 sm:p-6 gap-4 sm:gap-6"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 sm:h-28 sm:w-28 object-contain rounded-md flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-grow flex flex-col justify-between w-full">
                <div>
                  <h2 className="font-[Raleway] font-semibold text-lg sm:text-xl leading-snug line-clamp-2 text-[#101010]">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 flex items-center space-x-3 sm:space-x-4 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center border rounded-md overflow-hidden select-none text-[#101010]">
                    <button
                      onClick={() => decrement(item.id)}
                      className="px-3 py-1 text-lg font-semibold bg-gray-200 text-gray-500 hover:bg-gray-300 transition"
                    >
                      –
                    </button>
                    <span className="px-4 py-1 text-base sm:text-lg font-mono">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="px-3 py-1 text-lg font-semibold bg-gray-200 text-gray-500 hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-600 hover:text-red-800 underline text-sm sm:text-base font-semibold whitespace-nowrap"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6 space-y-3 sm:space-y-0">
        <motion.span
          key={total}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="font-[Raleway] font-extrabold text-2xl sm:text-3xl tracking-wide"
        >
          Total:{' '}
          <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent font-black">
            ${total.toFixed(2)}
          </span>
        </motion.span>

        <motion.button
          onClick={handleClear}
          whileTap={{ scale: 0.9, rotate: -2 }}
          animate={clearing ? { scale: [1, 1.1, 0.9, 1], rotate: [0, 2, -2, 0] } : {}}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-3 px-8 rounded-lg hover:brightness-110 transition-all font-semibold text-base sm:text-lg"
        >
          Clear Cart
        </motion.button>
      </div>
    </section>
  )
}
