import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { TradeGood } from '@/components/market/trade-good'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { TRADE_SYMBOL } from '@/config/constants'
import { ShipContext } from '@/context/ship.context'
import { updateShipCargo, updateShipInFleetCargo } from '@/features/ship/actions'
import { createShipCargoSellMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { SellCargoForm } from './sell-cargo.form'
import { type SellCargoProps } from './sell-cargo.types'

export const SellCargo = ({
  good,
  action = (props) => (
    <button className="btn btn-outline btn-confirm" {...props}>
      Sell
    </button>
  ),
}: SellCargoProps) => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore((state) => state.actions)
  const ship = useContext(ShipContext)
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: createShipCargoSellMutation.getMutationKey(),
    mutationFn: createShipCargoSellMutation.mutationFn,

    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship)
        client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1)
        client.setQueryData(getShipListQuery.getQueryKey(), updateShipInFleetCargo(ships, index, response.data.cargo))

      setAgent(response.data.agent)
    },
    onSettled: () => {
      modal.close()
    },
  })

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={<Modal.Trigger disabled={good.tradeVolume === 0}>{action}</Modal.Trigger>}
      closeable
    >
      <div className="grid gap-8">
        <div className="text-title">
          Sell: <span className="font-light">{TRADE_SYMBOL.get(good.symbol)}</span>
        </div>

        <TradeGood price={good.sellPrice} volume={good.tradeVolume} supply={good.supply} />

        <SellCargoForm
          ship={ship}
          good={good}
          onSubmit={(values) =>
            mutateAsync({
              shipSymbol: values.ship,
              itemSymbol: values.item,
              units: values.quantity,
            })
          }
        />
      </div>
    </Modal>
  )
}
