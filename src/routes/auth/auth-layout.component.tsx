import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Layout } from '@/features/auth'

export const AuthLayout = () => {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}
