import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import * as Contracts from '@/features/contracts'

export const ContractsRouteComponent = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Contracts</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>
          <Contracts.List />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Route = withQSB()(ContractsRouteComponent)
