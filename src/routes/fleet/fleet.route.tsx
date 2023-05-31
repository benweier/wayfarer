import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ShipList } from '@/features/ship/list'

export const FleetRouteComponent = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Fleet</h1>

      <div className="grid gap-12">
        <QuerySuspenseBoundary>
          <ShipList />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Route = withQSB()(FleetRouteComponent)
