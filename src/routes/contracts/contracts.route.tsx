import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ContractList, ContractListFallback } from '@/features/contract/list'

export const ContractsRouteComponent = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Contracts</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary fallback={<ContractListFallback />}>
          <ContractList />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Route = withQSB()(ContractsRouteComponent)
