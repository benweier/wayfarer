import { i18n } from '@/services/i18n'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
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
  head: (ctx) => {
    return {
      meta: [
        {
          title: i18n.t('title_template', {
            title: 'system.title',
            systemSymbol: ctx.loaderData.system.data.symbol,
            ns: 'meta',
          }),
        },
      ],
    }
  },
  notFoundComponent: NotFound,
})
