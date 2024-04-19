import { SystemsRoute } from '@/routes/systems'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/systems/')({
  component: SystemsRoute,
})
