import { createFileRoute } from '@tanstack/react-router'
import { HomeRoute } from '@/routes/home'

export const Route = createFileRoute('/')({
  component: HomeRoute,
})
