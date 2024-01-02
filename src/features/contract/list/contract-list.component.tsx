import { Tab } from '@headlessui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as ContractActions from '@/features/contract/actions'
import { ContractDeliver } from '@/features/contract/deliver'
import { getContractListQuery } from '@/services/api/spacetraders'
import { type ContractResponse } from '@/types/spacetraders'
import { acceptedContractsColumns, availableContractsColumns, completedContractsColumns } from './contract-list.columns'
import { ContractListContext } from './contract-list.context'
import { ContractListTable } from './contract-list.table'
import { contractsReducer } from './contracts.utilities'

const AcceptContractsAction = ({ contract }: { contract: ContractResponse }) => {
  const { t } = useTranslation()

  return (
    <ContractActions.Accept contract={contract}>
      {(args) => (
        <Button
          ref={args.ref}
          disabled={args.disabled}
          intent="confirm"
          kind="flat"
          size="small"
          onClick={() => {
            void args.execute()
          }}
        >
          {t('contract.accept', { context: 'action' })}
        </Button>
      )}
    </ContractActions.Accept>
  )
}
const AvailableContractsAction = ({ contract }: { contract: ContractResponse }) => {
  const { t } = useTranslation()

  return contract.terms.deliver.every((item) => item.unitsRequired === item.unitsFulfilled) ? (
    <ContractActions.Fulfill contract={contract}>
      {(args) => (
        <Button
          ref={args.ref}
          disabled={args.disabled}
          intent="confirm"
          kind="flat"
          size="small"
          onClick={() => {
            void args.execute()
          }}
        >
          {t('contract.fulfill', { context: 'action' })}
        </Button>
      )}
    </ContractActions.Fulfill>
  ) : (
    <ContractDeliver contract={contract} />
  )
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

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab disabled={contracts.accepted.length === 0} className={({ selected }) => cx('group tab', { selected })}>
          {t('contracts.accepted')} ({contracts.accepted.length})
        </Tab>
        <Tab disabled={contracts.available.length === 0} className={({ selected }) => cx('group tab', { selected })}>
          {t('contracts.available')} ({contracts.available.length})
        </Tab>
        <Tab disabled={contracts.completed.length === 0} className={({ selected }) => cx('group tab', { selected })}>
          {t('contracts.completed')} ({contracts.completed.length})
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <ContractListContext.Provider value={{ Action: AvailableContractsAction }}>
            <ContractListTable
              data={contracts.accepted.map((contract) => ({ contract }))}
              columns={acceptedContractsColumns}
            />
          </ContractListContext.Provider>
        </Tab.Panel>

        <Tab.Panel>
          <ContractListContext.Provider value={{ Action: AcceptContractsAction }}>
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
