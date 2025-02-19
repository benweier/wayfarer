import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { meta } from '@/routes/systems/system/system-route.meta'
import { getSystemByIdQuery } from '@/services/api/spacetraders/systems'

export const Route = createFileRoute('/_dashboard/systems/$systemSymbol/')({
  params: {
    parse({ systemSymbol }) {
      return { systemSymbol: systemSymbol.toUpperCase() }
    },
    stringify({ systemSymbol }) {
      return { systemSymbol: systemSymbol.toUpperCase() }
    },
  },
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    try {
      const system = context.client.ensureQueryData(getSystemByIdQuery({ systemSymbol: params.systemSymbol }))

      return {
        system: await system,
      }
    } catch (_err) {
      throw notFound()
    }
  },
  notFoundComponent: NotFound,
})
