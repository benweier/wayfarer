import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ContractList, ContractListFallback } from '@/features/contract/list'
import { useTranslation } from 'react-i18next'

export const ContractsRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="display-md font-bold">{t('contracts.label')}</h1>

      <QuerySuspenseBoundary fallback={<ContractListFallback />}>
        <ContractList />
      </QuerySuspenseBoundary>
    </div>
  )
}
