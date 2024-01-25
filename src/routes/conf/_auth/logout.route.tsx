import { Navigate, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/logout')({
  beforeLoad: ({ context }) => {
    const auth = context.auth.getState()

    if (auth.isAuthenticated) {
      auth.actions.signout()
      throw redirect({ to: '/login', replace: true })
    }
  },
  component: () => <Navigate to="/login" replace />,
})
