import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_authenticated/fleet')({
  component: Outlet,
})
