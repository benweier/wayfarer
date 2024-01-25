import { createFileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/systems/system/system-route.meta'
import { getSystemByIdQuery } from '@/services/api/spacetraders'

export const Route = createFileRoute('/_dashboard/systems/$systemSymbol/')({
  parseParams: ({ systemSymbol }) => ({ systemSymbol: systemSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const system = context.client.ensureQueryData(getSystemByIdQuery({ systemSymbol: params.systemSymbol }))

    return {
      system: await system,
    }
  },
})
