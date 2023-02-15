import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { ViewSystem } from '@/features/Systems'

export const SystemViewRoute = () => {
  const { systemID } = useParams()

  return (
    <div>
      <h1 className="text-title p-4">
        System: <span className="font-normal">{systemID}</span>
      </h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>{systemID && <ViewSystem id={systemID} />}</QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const View = withQSB()(SystemViewRoute)
