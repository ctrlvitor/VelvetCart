import { create } from 'zustand'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartStoreState {
  items: CartItem[]
  add: (product: Omit<CartItem, 'quantity'>) => void
  remove: (id: number) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  clear: () => void
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: [],
  add: (product) => {
    const items = get().items.slice()
    const index = items.findIndex(i => i.id === product.id)
    if (index > -1) {
      items[index].quantity++
    } else {
      items.push({ ...product, quantity: 1 })
    }
    set({ items })
  },
  remove: (id) => set({ items: get().items.filter(i => i.id !== id) }),
  increment: (id) => {
    const items = get().items.slice()
    const index = items.findIndex(i => i.id === id)
    if (index > -1) {
      items[index].quantity++
      set({ items })
    }
  },
  decrement: (id) => {
    let items = get().items.slice()
    const index = items.findIndex(i => i.id === id)
    if (index > -1) {
      if (items[index].quantity > 1) {
        items[index].quantity--
      } else {
        items = items.filter(i => i.id !== id)
      }
      set({ items })
    }
  },
  clear: () => set({ items: [] }),
}))
