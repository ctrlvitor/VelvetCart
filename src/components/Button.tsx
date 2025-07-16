'use client'
import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps): React.ReactElement {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
      className="bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd text-white px-4 py-2 rounded-lg font-semibold shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </motion.button>
  )
}
