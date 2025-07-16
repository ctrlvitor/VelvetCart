import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'VelvetCart',
  description: "The most convincing fake store you'll wish was real.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow w-full px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
