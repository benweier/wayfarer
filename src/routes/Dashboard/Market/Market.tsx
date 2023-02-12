import { QuerySuspenseBoundary } from '@/components/QuerySuspenseBoundary'
export const Market = () => {
  return (
    <div>
      <h1 className="text-title p-4">Market</h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>
          <></>
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
