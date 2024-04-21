import { Button } from '@/components/button'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { ShipContext } from '@/context/ship.context'
import { TradeGoodInfo } from '@/features/trade-good/info'
import { createShipCargoSellMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useAuthStore } from '@/store/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TradeGoodSellForm } from './trade-good-sell.form'
import type { TradeGoodSellProps } from './trade-good-sell.types'

export const TradeGoodSell = ({
  good,
  disabled = false,
  trigger = (
    <Button intent="success" kind="outline" size="small">
      Sell
    </Button>
  ),
}: TradeGoodSellProps) => {
  const { t } = useTranslation()
  const ship = useContext(ShipContext)
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore((state) => state.actions)
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: createShipCargoSellMutation.getMutationKey(ship ? { shipSymbol: ship.symbol } : null),
    mutationFn: createShipCargoSellMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const shipByIdQueryKey = getShipByIdQuery({ shipSymbol }).queryKey
      const shipListQueryKey = getShipListQuery().queryKey
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
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
  const noCargo =
    ship !== undefined &&
    ship.cargo.inventory.find((cargo) => {
      return cargo.symbol === good?.symbol
    }) === undefined

  if (!good) return null

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={<Modal.Trigger disabled={disabled || good.tradeVolume === 0 || noCargo}>{trigger}</Modal.Trigger>}
      close={<Modal.Close />}
    >
      <Modal.Header>
        <Modal.Title>
          {t('market.sell')}: <span className="font-light">{t(good.symbol, { ns: 'spacetraders.trade_good' })}</span>
        </Modal.Title>
      </Modal.Header>

      <div className="space-y-8">
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
