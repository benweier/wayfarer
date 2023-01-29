import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Outlet } from 'react-router'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export const Layout = () => {
  return (
    <div className="relative">
      <Header />
      <div className="container py-4">
        <Suspense
          fallback={
            <div className="grid h-96 animate-pulse items-center justify-center text-zinc-200 dark:text-zinc-700">
              <GiNorthStarShuriken size={96} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
