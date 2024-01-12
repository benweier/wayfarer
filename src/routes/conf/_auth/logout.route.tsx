import { FileRoute, Navigate, redirect } from '@tanstack/react-router'

export const Route = new FileRoute('/_auth/logout').createRoute({
  beforeLoad: ({ context }) => {
    const auth = context.auth.getState()

    if (auth.isAuthenticated) {
      auth.actions.signout()
      throw redirect({ to: '/login', replace: true })
    }
  },
  component: () => <Navigate to="/login" replace />,
})
