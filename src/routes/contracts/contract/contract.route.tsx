import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ContractDetail } from '@/features/contract/detail'

const ContractRouteComponent = () => {
  const { t } = useTranslation()
  const { contractId } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <div className="text-title">
          {t('contract.label')}: <span className="font-normal">{contractId}</span>
        </div>
      </div>

      <QuerySuspenseBoundary>{contractId && <ContractDetail id={contractId} />}</QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(ContractRouteComponent)
