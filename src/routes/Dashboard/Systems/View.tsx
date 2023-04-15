import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ViewSystem } from '@/features/Systems'

export const SystemViewRoute = () => {
  const { systemID } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">
        System: <span className="font-normal">{systemID}</span>
      </h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>{systemID && <ViewSystem systemID={systemID} />}</QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const View = withQSB()(SystemViewRoute)
