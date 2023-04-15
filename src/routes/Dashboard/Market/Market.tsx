import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'

export const Market = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Market</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>
          <></>
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
