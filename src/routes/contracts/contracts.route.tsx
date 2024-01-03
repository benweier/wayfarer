import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ContractList, ContractListFallback } from '@/features/contract/list'

export const ContractsRouteComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('contracts.label')}</h1>

      <QuerySuspenseBoundary fallback={<ContractListFallback />}>
        <ContractList />
      </QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(ContractsRouteComponent)
