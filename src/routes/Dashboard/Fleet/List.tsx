import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { Fleet } from '@/features/Fleet'

export const FleetRoute = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Fleet</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>
          <Fleet />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const List = withQSB()(FleetRoute)
