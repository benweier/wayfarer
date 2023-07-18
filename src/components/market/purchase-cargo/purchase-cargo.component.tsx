import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TradeGood } from '@/components/market/trade-good'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { TRADE_SYMBOL } from '@/config/constants'
import { updateShipCargo, updateShipInFleetCargo } from '@/features/ship/actions'
import { createShipCargoPurchase } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { ShipResponse } from '@/types/spacetraders'
import { PurchaseCargoForm } from './purchase-cargo.form'
import { PurchaseCargoProps } from './purchase-cargo.types'

export const PurchaseCargo = ({
  good,
  action = (props) => (
    <button className="btn btn-outline btn-danger" {...props}>
      Buy
    </button>
  ),
}: PurchaseCargoProps) => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: ['cargo', good.symbol, 'purchase'],
    mutationFn: ({ shipID, symbol, units }: { shipID: string; symbol: string; units: number }) =>
      createShipCargoPurchase({ path: { shipID }, payload: { symbol, units } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))

      if (response.data.agent) {
        setAgent(response.data.agent)
      }
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })

      modal.close()
    },
  })

  if (!good) return null

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={<Modal.Trigger disabled={good.tradeVolume === 0}>{action}</Modal.Trigger>}
      closeable
    >
      <div className="grid gap-8">
        <div className="text-title">
          Buy: <span className="font-light">{TRADE_SYMBOL.get(good.symbol) ?? good.symbol}</span>
        </div>

        <TradeGood price={good.purchasePrice} volume={good.tradeVolume} supply={good.supply} />

        <PurchaseCargoForm
          good={good}
          onSubmit={(values) =>
            mutateAsync({
              shipID: values.ship,
              symbol: values.item,
              units: values.quantity,
            })
          }
        />
      </div>
    </Modal>
  )
}
