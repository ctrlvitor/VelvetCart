import { Suspense } from 'react'
import SearchResults from '@/components/SearchResults'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8"><p className="text-gray-600 text-lg">Loading search results...</p></div>}>
      <SearchResults />
    </Suspense>
  )
}