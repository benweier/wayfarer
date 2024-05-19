import { Loading } from '@/components/loading'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ShipNavStatus } from '@/config/spacetraders'
import { useShipResponse } from '@/context/ship.context'
import type { ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitJump = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal
      size="md"
      close={<Modal.Close />}
      trigger={<Modal.Trigger disabled={ship.nav.status !== ShipNavStatus.InOrbit}>{trigger}</Modal.Trigger>}
    >
      <Modal.Header>
        <Modal.Title>
          Jump Ship: <span className="font-normal">{ship.symbol}</span>
        </Modal.Title>
      </Modal.Header>

      <QuerySuspenseBoundary
        fallback={
          <div className="grid">
            <Loading />
            <Loading />
            <Loading />
          </div>
        }
      />
    </Modal>
  )
}
