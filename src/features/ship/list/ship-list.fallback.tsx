import { Loading } from '@/components/loading'

export const ShipListFallback = () => {
  return (
    <div className="space-y-2">
      <Loading />
      <Loading />
      <Loading />
    </div>
  )
}
