import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TradeGood } from '@/components/market/trade-good'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { TRADE_SYMBOL } from '@/config/constants'
import { updateShipCargo, updateShipInFleetCargo } from '@/features/ship/actions'
import { createShipCargoPurchaseMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { PurchaseCargoForm } from './purchase-cargo.form'
import { type PurchaseCargoProps } from './purchase-cargo.types'

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
    mutationKey: createShipCargoPurchaseMutation.getMutationKey(),
    mutationFn: createShipCargoPurchaseMutation.mutationFn,
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
    onSettled: (_res, _err, { shipSymbol }) => {
      void client.invalidateQueries({ queryKey: getShipListQuery.getQueryKey() })
      void client.invalidateQueries({ queryKey: getShipByIdQuery.getQueryKey({ shipSymbol }) })

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
          Buy: <span className="font-light">{TRADE_SYMBOL.get(good.symbol) ?? good.symbol}</span>
        </div>

        <TradeGood price={good.purchasePrice} volume={good.tradeVolume} supply={good.supply} />

        <PurchaseCargoForm
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
