import { ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({ skeleton = null }: { skeleton?: ReactNode }) => {
  return (
    <div className="container max-w-5xl py-4">
      <Suspense fallback={skeleton}>
        <Outlet />
      </Suspense>
    </div>
  )
}
