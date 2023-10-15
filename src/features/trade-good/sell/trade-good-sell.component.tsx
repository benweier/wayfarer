import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { TRADE_SYMBOL } from '@/config/constants'
import { TradeGoodInfo } from '@/features/trade-good/info'
import { createShipCargoSellMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'
import { TradeGoodSellForm } from './trade-good-sell.form'
import { type TradeGoodSellProps } from './trade-good-sell.types'

export const TradeGoodSell = ({ ship, good }: TradeGoodSellProps) => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore((state) => state.actions)
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: createShipCargoSellMutation.getMutationKey(),
    mutationFn: createShipCargoSellMutation.mutationFn,
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
  const noCargo = Boolean(
    ship &&
      ship.cargo.inventory.find((cargo) => {
        return cargo.symbol === good.symbol && cargo.units > 0
      }) === undefined,
  )

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={
        <Modal.Trigger disabled={good.tradeVolume === 0 || noCargo}>
          {(props) => (
            <button className="btn btn-confirm btn-outline" {...props}>
              <span className="flex flex-col">
                <span className="text-xs uppercase">Sell</span>
                <span className="text-base font-bold">{formatNumber(good.sellPrice)}</span>
              </span>
            </button>
          )}
        </Modal.Trigger>
      }
      closeable
    >
      <div className="space-y-8">
        <div className="text-title">
          Sell: <span className="font-light">{TRADE_SYMBOL.get(good.symbol)}</span>
        </div>

        <TradeGoodInfo price={good.sellPrice} volume={good.tradeVolume} supply={good.supply} />

        <TradeGoodSellForm
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
