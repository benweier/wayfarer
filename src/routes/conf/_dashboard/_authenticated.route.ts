import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_authenticated')({
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
