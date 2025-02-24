import { i18n } from '@/services/i18n'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'

export const Route = createFileRoute('/_dashboard/agents/$agentSymbol')({
  params: {
    parse({ agentSymbol }) {
      return { agentSymbol: agentSymbol.toUpperCase() }
    },
    stringify({ agentSymbol }) {
      return { agentSymbol: agentSymbol.toUpperCase() }
    },
  },
  loader: async ({ context, params }) => {
    try {
      const agent = context.client.ensureQueryData(getAgentBySymbolQuery({ agentSymbol: params.agentSymbol }))

      return {
        agent: await agent,
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
            title: 'agent.title',
            agentSymbol: ctx.loaderData.agent.data.symbol,
            ns: 'meta',
          }),
        },
      ],
    }
  },
  notFoundComponent: NotFound,
})
