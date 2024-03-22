import { Tab } from '@headlessui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { AcceptContractAction } from '@/features/contract/list/accept-contract.action'
import { AvailableContractAction } from '@/features/contract/list/available-contract.action'
import { getContractListQuery } from '@/services/api/spacetraders'
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
        <div className="text-xl font-semibold">{t('contracts.no_contracts')}</div>
      </div>
    )
  }

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab className="group tab">
          {t('contracts.accepted')} ({contracts.accepted.length})
        </Tab>
        <Tab className="group tab">
          {t('contracts.available')} ({contracts.available.length})
        </Tab>
        <Tab className="group tab">
          {t('contracts.completed')} ({contracts.completed.length})
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <ContractListContext.Provider value={ACCEPT_CONTRACTS_CONTEXT}>
            <ContractListTable
              data={contracts.accepted.map((contract) => ({ contract }))}
              columns={acceptedContractsColumns}
            />
          </ContractListContext.Provider>
        </Tab.Panel>

        <Tab.Panel>
          <ContractListContext.Provider value={AVAILABLE_CONTRACTS_CONTEXT}>
            <ContractListTable
              data={contracts.available.map((contract) => ({ contract }))}
              columns={availableContractsColumns}
            />
          </ContractListContext.Provider>
        </Tab.Panel>

        <Tab.Panel>
          <ContractListTable
            data={contracts.completed.map((contract) => ({ contract }))}
            columns={completedContractsColumns}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
