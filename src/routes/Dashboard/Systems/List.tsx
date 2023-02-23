import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { ListSystems } from '@/features/Systems'

export const SystemsListRoute = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Systems</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>
          <ListSystems />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const List = withQSB()(SystemsListRoute)
