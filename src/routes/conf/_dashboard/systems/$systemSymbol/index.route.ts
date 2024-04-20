import { NotFound } from '@/components/not-found'
import { meta } from '@/routes/systems/system/system-route.meta'
import { getSystemByIdQuery } from '@/services/api/spacetraders/systems'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/systems/$systemSymbol/')({
  parseParams: ({ systemSymbol }) => ({ systemSymbol: systemSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    try {
      const system = context.client.ensureQueryData(getSystemByIdQuery({ systemSymbol: params.systemSymbol }))

      return {
        system: await system,
      }
    } catch (err) {
      throw notFound()
    }
  },
  notFoundComponent: NotFound,
})
