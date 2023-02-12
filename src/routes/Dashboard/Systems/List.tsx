import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { ListSystems } from '@/features/Systems'

export const SystemsListRoute = () => {
  return (
    <div>
      <h1 className="text-title p-4">Systems</h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>
          <ListSystems />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const List = withQSB()(SystemsListRoute)
