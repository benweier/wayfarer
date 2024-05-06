import { Layout } from '@/features/auth'
import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { useAuthCommands } from './use-auth-commands.hook'

export const AuthLayout = () => {
  useAuthCommands()

  return (
    <Layout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}
