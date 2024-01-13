import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/fleet/fleet-route.meta'

export const Route = new FileRoute('/_dashboard/_authenticated/fleet/').createRoute({
  beforeLoad: () => ({ meta }),
  staleTime: Infinity,
  gcTime: Infinity,
})
