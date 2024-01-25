import { createLazyFileRoute } from '@tanstack/react-router'
import { SystemsRoute } from '@/routes/systems'

export const Route = createLazyFileRoute('/_dashboard/systems/')({
  component: SystemsRoute,
})
