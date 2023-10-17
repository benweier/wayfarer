import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { TRADE_SYMBOL } from '@/config/constants'
import { TradeGoodInfo } from '@/features/trade-good/info'
import { createShipCargoPurchaseMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'
import { TradeGoodBuyForm } from './trade-good-buy.form'
import { type TradeGoodBuyProps } from './trade-good-buy.types'

export const TradeGoodBuy = ({
  ship,
  good,
  action = (props) => (
    <button className="btn btn-outline btn-danger" {...props}>
      <div>
        <div className="text-xs uppercase">Buy</div>
        <div className="text-base font-bold">{formatNumber(good.purchasePrice)}</div>
      </div>
    </button>
  ),
}: TradeGoodBuyProps) => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore((state) => state.actions)
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: createShipCargoPurchaseMutation.getMutationKey(),
    mutationFn: createShipCargoPurchaseMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].cargo = response.data.cargo
          }),
        )
      }

      setAgent(response.data.agent)
    },
    onSettled: () => {
      modal.close()
    },
  })
  const noCargo = Boolean(ship && ship.cargo.units === ship.cargo.capacity)

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={<Modal.Trigger disabled={good.tradeVolume === 0 || noCargo}>{action}</Modal.Trigger>}
      closeable
    >
      <div className="space-y-8">
        <div className="text-title">
          Buy: <span className="font-light">{TRADE_SYMBOL.get(good.symbol)}</span>
        </div>

        <TradeGoodInfo price={good.purchasePrice} volume={good.tradeVolume} supply={good.supply} />

        <TradeGoodBuyForm
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
