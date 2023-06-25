import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipContext } from '@/context/ship.context'
import { ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitWarp = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipContext()

  return (
    <Modal size="md" closeable trigger={<Modal.Trigger>{trigger}</Modal.Trigger>}>
      <div className="grid gap-8">
        <h3 className="text-title">
          Warp Ship: <span className="font-normal">{ship.symbol}</span>
        </h3>
        <QuerySuspenseBoundary
          fallback={
            <div className="grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mx-auto my-4 h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
              ))}
            </div>
          }
        ></QuerySuspenseBoundary>
      </div>
    </Modal>
  )
}
