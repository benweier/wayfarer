import { FileRoute } from '@tanstack/react-router'
import { HomeRoute } from '@/routes/home'

export const Route = new FileRoute('/').createRoute({
  component: HomeRoute,
})
