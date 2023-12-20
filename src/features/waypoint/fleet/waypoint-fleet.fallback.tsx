import { Loading } from '@/components/loading'

export const WaypointFleetFallback = () => {
  return (
    <div className="space-y-2">
      <Loading />
      <Loading />
      <Loading />
    </div>
  )
}
