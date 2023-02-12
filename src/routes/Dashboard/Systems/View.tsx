import { useParams } from 'react-router'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'

export const SystemViewRoute = () => {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-title p-4">
        System: <span className="font-normal">{id}</span>
      </h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>
          <></>
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const View = withQSB()(SystemViewRoute)
