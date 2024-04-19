import { Loading } from '@/components/loading'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import type { ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitJump = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal
      size="md"
      close={<Modal.Close />}
      trigger={<Modal.Trigger disabled={ship.nav.status !== 'IN_ORBIT'}>{trigger}</Modal.Trigger>}
    >
      <div className="grid gap-8">
        <h3 className="display-lg font-bold">
          Jump Ship: <span className="font-normal">{ship.symbol}</span>
        </h3>
        <QuerySuspenseBoundary
          fallback={
            <div className="grid">
              <Loading />
              <Loading />
              <Loading />
            </div>
          }
        ></QuerySuspenseBoundary>
      </div>
    </Modal>
  )
}
