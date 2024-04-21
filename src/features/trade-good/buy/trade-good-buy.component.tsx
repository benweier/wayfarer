import { Button } from '@/components/button'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { ShipContext } from '@/context/ship.context'
import { TradeGoodInfo } from '@/features/trade-good/info'
import { createShipCargoPurchaseMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useAuthStore } from '@/store/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TradeGoodBuyForm } from './trade-good-buy.form'
import type { TradeGoodBuyProps } from './trade-good-buy.types'

export const TradeGoodBuy = ({
  good,
  disabled = false,
  trigger = (
    <Button intent="danger" kind="outline" size="small">
      Buy
    </Button>
  ),
}: TradeGoodBuyProps) => {
  const { t } = useTranslation()
  const ship = useContext(ShipContext)
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore((state) => state.actions)
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: createShipCargoPurchaseMutation.getMutationKey(ship ? { shipSymbol: ship.symbol } : null),
    mutationFn: createShipCargoPurchaseMutation.mutationFn,
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
  const noCapacity = ship !== undefined && ship.cargo.units === ship.cargo.capacity

  if (!good) return null

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={<Modal.Trigger disabled={disabled || good.tradeVolume === 0 || noCapacity}>{trigger}</Modal.Trigger>}
      close={<Modal.Close />}
    >
      <Modal.Header>
        <Modal.Title>
          {t('market.buy')}: <span className="font-light">{t(good.symbol, { ns: 'spacetraders.trade_good' })}</span>
        </Modal.Title>
      </Modal.Header>

      <div className="space-y-8">
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
