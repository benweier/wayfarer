import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { SystemList, SystemListFallback } from '@/features/system/list'

const SystemListComponent = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Systems</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary fallback={<SystemListFallback />}>
          <SystemList />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Route = withQSB()(SystemListComponent)
