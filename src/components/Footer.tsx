'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'

const copyVariants = [
  '— cart full, self-control empty. (on a site that barely works)',
  '— built for impulsive clicks (and imaginary purchases).',
  '— UX so smooth, even paying feels good. (too bad you can’t)',
  '— where shipping is light and design is heavy. (because nothing’s actually shipping)',
  '— if you feel like buying everything… yeah, that’s on me. (but you can’t, it’s fake)',
  '— UI so good, even the stock feels shy. (especially since there isn’t any)',
  '— even my 404 page is kinda cute. (and very, very real)',
  '— totally real store. trust me, I\'m just one guy on the internet.',
  '— buy that... if only that worked.',
];

export default function Footer() {
  const [randomCopy, setRandomCopy] = useState('')

  useEffect(() => {
    const pick = copyVariants[Math.floor(Math.random() * copyVariants.length)]
    setRandomCopy(pick)
  }, [])

  return (
    <footer className="w-full bg-gradient-to-tr from-zinc-900 via-black to-zinc-950 text-zinc-400 px-4 sm:px-8 md:px-12 py-5 text-xs sm:text-sm z-50 border-t border-zinc-800 shadow-[0_-1px_4px_rgba(0,0,0,0.2)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 text-center md:text-left"
      >
        
        <p className="max-w-xs sm:max-w-md md:max-w-none leading-snug text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Vitor S. {randomCopy}
        </p>

        <div className="flex items-center justify-center gap-6 px-5 py-2 rounded-xl bg-zinc-800/40 backdrop-blur-sm border border-zinc-700">
          <div className="flex items-center gap-1 text-zinc-200">
            <SiNextdotjs className="text-base" />
            <span className="font-semibold text-sm bg-gradient-to-r from-zinc-400 to-white bg-clip-text text-transparent">
              Next.js
            </span>
          </div>

          <div className="flex items-center gap-1 text-blue-400">
            <SiTypescript className="text-base" />
            <span className="font-semibold text-sm bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent">
              TypeScript
            </span>
          </div>

          <div className="flex items-center gap-1 text-sky-400">
            <SiTailwindcss className="text-base" />
            <span className="font-semibold text-sm bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Tailwind
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
