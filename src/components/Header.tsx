'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from '@/lib/motion'
import { SocialIcons } from './SocialIcons'
import { FiSearch } from 'react-icons/fi'

const Header = () => {
  const itemsCount = useCartStore(state =>
    state.items.reduce((acc, i) => acc + i.quantity, 0)
  )

  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) return
    router.push(`/search?query=${encodeURIComponent(search.trim())}`)
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full h-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-50 backdrop-blur-md shadow-sm
        bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
    >

      <div className="flex items-center gap-4 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-lg sm:text-xl font-semibold font-[Raleway] text-zinc-100 select-none group-hover:opacity-90 transition-opacity"
          >
            Velvet
            <strong
              className="
                bg-gradient-to-r from-purple-400 via-purple-600 to-fuchsia-500
                bg-clip-text text-transparent
                drop-shadow-[0_0_1px_rgba(168,85,247,0.3)]
                drop-shadow-[0_0_2px_rgba(192,132,252,0.2)]
                drop-shadow-[0_0_3px_rgba(232,121,249,0.2)]
                animate-neonGlow
              "
            >
              Cart
            </strong>
          </motion.h1>
        </Link>

        <div className="h-5 w-px bg-zinc-500/50" />

        <Link href="/cart" className="relative">
  <motion.div
    whileHover={{ scale: 1.2 }}
    className="cursor-pointer"
    aria-label="Cart"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 sm:h-7 sm:w-7 text-zinc-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
      <circle cx={7} cy={21} r={2} />
      <circle cx={17} cy={21} r={2} />
    </svg>

    <AnimatePresence mode="popLayout">
      {itemsCount > 0 && (
        <motion.span
          key={itemsCount}
          initial={{ scale: 0, opacity: 0, y: -5 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute -top-2 -right-2 bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md"
        >
          {itemsCount}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.div>
</Link>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="flex w-full max-w-lg mx-auto sm:mx-0"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-4 py-2 rounded-l-md bg-zinc-800 text-sm text-white 
                     placeholder:text-zinc-400 placeholder:text-center placeholder:italic placeholder:font-medium 
                     focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 rounded-r-md hover:opacity-90 flex items-center justify-center"
        >
          <FiSearch size={16} />
        </button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex-shrink-0"
      >
        <SocialIcons />
      </motion.div>
    </motion.header>
  )
}

export default Header
