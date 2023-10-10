import { type PropsWithChildren } from 'react'
import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'
import { redirectSchema } from '@/validators/redirect.schema'

export const Required = ({ children = <Outlet /> }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore()
  const data = useLoaderData()

  if (!isAuthenticated) {
    const result = redirectSchema.safeParse(data)

    return <Navigate to="/login" replace state={result.success ? result.data : null} />
  }

  return <>{children}</>
}
