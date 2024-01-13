import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/contracts/contracts-route.meta'

export const Route = new FileRoute('/_dashboard/_authenticated/contracts').createRoute({
  beforeLoad: () => ({ meta }),
})
