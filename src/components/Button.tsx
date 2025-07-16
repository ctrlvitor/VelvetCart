'use client'
import { motion } from '@/lib/motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps): JSX.Element {
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
