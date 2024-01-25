import { createLazyFileRoute } from '@tanstack/react-router'
import { SystemRoute } from '@/routes/systems/system'

export const Route = createLazyFileRoute('/_dashboard/systems/$systemSymbol/')({
  component: SystemRoute,
})
