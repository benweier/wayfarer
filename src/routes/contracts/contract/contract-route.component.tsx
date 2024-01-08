import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ContractDetail } from '@/features/contract/detail'
import { contractRoute } from '@/routes/contracts/contract'

export const ContractRoute = () => {
  const { t } = useTranslation()
  const { contractId } = contractRoute.useParams()

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <div className="text-title">
          {t('contract.label')}: <span className="font-normal">{contractId}</span>
        </div>
      </div>

      <QuerySuspenseBoundary>{contractId && <ContractDetail id={contractId} />}</QuerySuspenseBoundary>
    </div>
  )
}
