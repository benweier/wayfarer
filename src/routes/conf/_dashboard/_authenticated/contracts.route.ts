import { i18n } from '@/services/i18n'
import { createFileRoute, defer } from '@tanstack/react-router'
import { getContractListQuery } from '@/services/api/spacetraders/contracts'

export const Route = createFileRoute('/_dashboard/_authenticated/contracts')({
  loader: ({ context }) => {
    const contracts = context.client.ensureQueryData(getContractListQuery())

    return {
      contracts: defer(contracts),
    }
  },
  head: () => {
    return {
      meta: [{ title: i18n.t('title_template', { title: 'contracts.title', ns: 'meta' }) }],
    }
  },
})
