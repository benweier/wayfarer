import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { List } from '@/features/systems'
import { Fallback } from '@/features/systems/systems-list.fallback'

const SystemListComponent = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Systems</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary fallback={<Fallback />}>
          <List />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Route = withQSB()(SystemListComponent)
