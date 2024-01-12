import { FileRoute, redirect } from '@tanstack/react-router'

export const Route = new FileRoute('/_dashboard/_authenticated').createRoute({
  beforeLoad: ({ location, context }) => {
    if (!context.auth.getState().isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
        mask: { to: '/login' },
        replace: true,
      })
    }
  },
})
