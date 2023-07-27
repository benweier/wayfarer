import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TradeGood } from '@/components/market/trade-good'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { TRADE_SYMBOL } from '@/config/constants'
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
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: createShipCargoSellMutation.getMutationKey(),
    mutationFn: createShipCargoSellMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: [{ scope: 'ships' }] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship)
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          updateShipCargo(ctx.ship, response.data.cargo),
        )
      if (ctx?.ships && index > -1)
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          updateShipInFleetCargo(ctx.ships, index, response.data.cargo),
        )

      setAgent(response.data.agent)
    },
    onSettled: (_res, _err) => {
      void client.invalidateQueries({ queryKey: [{ scope: 'ships' }] })

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
          Sell: <span className="font-light">{TRADE_SYMBOL.get(good.symbol) ?? good.symbol}</span>
        </div>

        <TradeGood price={good.sellPrice} volume={good.tradeVolume} supply={good.supply} />

        <SellCargoForm
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
