import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/systems')({
  component: Outlet,
})
