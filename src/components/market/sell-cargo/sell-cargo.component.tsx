import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TradeGood } from '@/components/market/trade-good'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { TRADE_SYMBOL } from '@/config/constants'
import { updateShipCargo, updateShipInFleetCargo } from '@/features/ship/actions'
import { createShipCargoSell } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { ShipResponse } from '@/types/spacetraders'
import { SellCargoForm } from './sell-cargo.form'
import { SellCargoProps } from './sell-cargo.types'

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
    mutationKey: ['cargo', good.symbol, 'sell'],
    mutationFn: ({ shipSymbol, symbol, units }: { shipSymbol: string; symbol: string; units: number }) =>
      createShipCargoSell({ path: { shipSymbol }, payload: { symbol, units } }),
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })
    },
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) client.setQueryData(['ship', shipSymbol], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))

      if (response.data.agent) {
        setAgent(response.data.agent)
      }
    },
    onSettled: (_res, _err, { shipSymbol }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })

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
          Sell: <span className="font-light">{TRADE_SYMBOL.get(good.symbol) ?? good.symbol}</span>
        </div>

        <TradeGood price={good.sellPrice} volume={good.tradeVolume} supply={good.supply} />

        <SellCargoForm
          good={good}
          onSubmit={(values) =>
            mutateAsync({
              shipSymbol: values.ship,
              symbol: values.item,
              units: values.quantity,
            })
          }
        />
      </div>
    </Modal>
  )
}
