import { Outlet } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { MyShips } from '@/features/Fleet'

export const FleetRoute = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Fleet</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>
          <MyShips />
        </QuerySuspenseBoundary>
      </div>
      <Outlet />
    </div>
  )
}

export const List = withQSB()(FleetRoute)
