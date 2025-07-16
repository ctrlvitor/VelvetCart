'use client'

import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 rounded-xl shadow-md p-3 w-full max-w-[240px] h-[280px] flex flex-col justify-between hover:shadow-xl hover:scale-[1.015] transition-all duration-200 ease-out">

      <Link href={`/product/${product.id}`} className="flex flex-col h-full group">
        <div className="flex justify-center items-center h-[160px] w-full mb-2">
          <div className="relative w-[150px] h-[150px]">
            <Image
              src={product.image || '/favicon.ico'}
              alt={product.title}
              fill
              className="object-contain"
              sizes="150px"
              priority={false}
            />
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.6rem] mb-1 group-hover:underline transition-all">
          {product.title}
        </h3>

        <p className="text-base font-bold text-gray-900 mt-auto">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  )
}
