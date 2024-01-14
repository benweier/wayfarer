import { FileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { meta } from '@/routes/systems/systems-route.meta'

export const Route = new FileRoute('/_dashboard/systems/').createRoute({
  validateSearch: z.object({
    page: z.number().min(1).optional().catch(1),
  }),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  beforeLoad: () => ({ meta }),
})