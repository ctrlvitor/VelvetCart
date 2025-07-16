import { Product } from '@/types'
import CategorySection from '@/components/CategorySection'
import FlashDeals from '@/components/FlashDeals'

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' })
  return res.json()
}

const banners = [
  { image: '/assets/asset-8.jpg', title: 'Exclusive Electronics Deals' },
  { image: '/assets/asset-10.jpg', title: "Men's Clothing Sale" },
  { image: '/assets/asset-11.jpg', title: "Women's Clothing Specials" },
  { image: '/assets/asset-12.jpg', title: 'Jewelry Offers' },
]

export default async function HomePage() {
  const products = await getProducts()
  const isValid = (p: Product) => p && p.id && p.title && p.image && typeof p.price === 'number'
  const valid = products.filter(isValid)
  const shuffle = [...valid].sort(() => 0.5 - Math.random()).slice(0, 8)

  const categories = [
    {
      title: 'Electronics',
      list: valid.filter(p => p.category === 'electronics'),
      banner: banners[0],
    },
    {
      title: "Men's Clothing",
      list: valid.filter(p => p.category === "men's clothing"),
      banner: banners[1],
    },
    {
      title: "Women's Clothing",
      list: valid.filter(p => p.category === "women's clothing"),
      banner: banners[2],
    },
    {
      title: 'Jewelry',
      list: valid.filter(p => p.category === 'jewelery'),
      banner: banners[3],
    },
  ]

  return (
    <main className="bg-[#101010] w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <FlashDeals products={shuffle} />

      {categories.map(({ title, list, banner }) => (
        <section key={title} className="space-y-5">
          <CategorySection
            title={title}
            products={list}
            banner={banner.image}
          />
        </section>
      ))}
    </main>
  )
}
