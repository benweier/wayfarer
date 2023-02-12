import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { MyShips } from '@/features/Fleet'

export const FleetRoute = () => {
  return (
    <div>
      <h1 className="text-title p-4">Fleet</h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>
          <MyShips />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const List = withQSB()(FleetRoute)
