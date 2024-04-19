import { SystemRoute } from '@/routes/systems/system'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/systems/$systemSymbol/')({
  component: SystemRoute,
})
