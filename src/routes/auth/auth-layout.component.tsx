import { Layout } from '@/features/auth'
import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

export const AuthLayout = () => {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}
