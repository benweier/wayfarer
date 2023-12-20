import { Loading } from '@/components/loading'

export const WaypointJumpGateFallback = () => {
  return (
    <div className="space-y-2">
      <Loading />
      <Loading />
      <Loading />
    </div>
  )
}
