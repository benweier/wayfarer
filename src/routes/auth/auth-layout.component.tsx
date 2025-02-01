import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Layout } from '@/features/auth'
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
