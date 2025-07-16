import { useState, useEffect } from 'react'
import { Product } from '../types'

interface UseFetchProductsReturn {
  products: Product[]
  loading: boolean
}

export function useFetchProducts(): UseFetchProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  return { products, loading }
}
