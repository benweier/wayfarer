import * as Tabs from '@/components/tabs'
import { AcceptContractAction } from '@/features/contract/list/accept-contract.action'
import { AvailableContractAction } from '@/features/contract/list/available-contract.action'
import { getContractListQuery } from '@/services/api/spacetraders'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { acceptedContractsColumns, availableContractsColumns, completedContractsColumns } from './contract-list.columns'
import { ContractListContext } from './contract-list.context'
import { ContractListTable } from './contract-list.table'
import { contractsReducer } from './contracts.utilities'

const AVAILABLE_CONTRACTS_CONTEXT = {
  Action: AvailableContractAction,
}
const ACCEPT_CONTRACTS_CONTEXT = {
  Action: AcceptContractAction,
}

export const ContractList = () => {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery({
    ...getContractListQuery(),
    select: (response) => {
      return {
        data: response.data.reduce(contractsReducer, {
          available: [],
          accepted: [],
          completed: [],
        }),
        meta: response.meta,
      }
    },
  })
  const contracts = data.data
  const meta = data.meta

  if (meta.total === 0) {
    return (
      <div className="flex flex-col">
        <div className="typography-xl font-semibold">{t('contracts.no_contracts')}</div>
      </div>
    )
  }

  return (
    <Tabs.Root defaultValue="accepted">
      <Tabs.List>
        <Tabs.Trigger value="accepted">
          {t('contracts.accepted')} ({contracts.accepted.length})
        </Tabs.Trigger>
        <Tabs.Trigger value="available">
          {t('contracts.available')} ({contracts.available.length})
        </Tabs.Trigger>
        <Tabs.Trigger value="completed">
          {t('contracts.completed')} ({contracts.completed.length})
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="accepted">
        <ContractListContext.Provider value={ACCEPT_CONTRACTS_CONTEXT}>
          <ContractListTable
            data={contracts.accepted.map((contract) => ({ contract }))}
            columns={acceptedContractsColumns}
          />
        </ContractListContext.Provider>
      </Tabs.Content>

      <Tabs.Content value="available">
        <ContractListContext.Provider value={AVAILABLE_CONTRACTS_CONTEXT}>
          <ContractListTable
            data={contracts.available.map((contract) => ({ contract }))}
            columns={availableContractsColumns}
          />
        </ContractListContext.Provider>
      </Tabs.Content>

      <Tabs.Content value="completed">
        <ContractListTable
          data={contracts.completed.map((contract) => ({ contract }))}
          columns={completedContractsColumns}
        />
      </Tabs.Content>
    </Tabs.Root>
  )
}
