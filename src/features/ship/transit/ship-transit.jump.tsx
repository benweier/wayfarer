import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { type ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitJump = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal size="md" close={<Modal.Close />} trigger={<Modal.Trigger>{trigger}</Modal.Trigger>}>
      <div className="grid gap-8">
        <h3 className="display-lg font-bold">
          Jump Ship: <span className="font-normal">{ship.symbol}</span>
        </h3>
        <QuerySuspenseBoundary
          fallback={
            <div className="grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="my-4 mx-auto h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
              ))}
            </div>
          }
        ></QuerySuspenseBoundary>
      </div>
    </Modal>
  )
}
