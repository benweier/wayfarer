import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ButtonHTMLAttributes, ReactNode, useCallback } from 'react'
import { Controller, FormProvider, useForm, useFormState, useWatch } from 'react-hook-form'
import { TradeGood } from '@/components/market/trade-good'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as ShipSelect from '@/components/ship/select.component'
import { TRADE_SYMBOL } from '@/config/constants'
import { useMarketTradeGoodContext } from '@/context/market-trade-good.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { updateShipCargo, updateShipInFleetCargo } from '@/features/ship/actions'
import { createShipCargoSell } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { ShipResponse } from '@/types/spacetraders'
import { SellCargoSchema, validation } from './sell.validation'

const SubmitPurchase = () => {
  const { isSubmitting, isValid } = useFormState()

  return (
    <button type="submit" className="btn btn-primary uppercase" disabled={isSubmitting || !isValid}>
      Sell
    </button>
  )
}

const SellPrice = ({ perUnit }: { perUnit: number }) => {
  const quantity = useWatch<{ quantity?: number }>({ name: 'quantity' }) ?? 0

  return (
    <div className="flex flex-wrap items-center gap-12">
      <div className="[max-width:50%]">
        <div className="text-secondary text-sm">SELL PRICE</div>
        <div className="truncate text-xl font-bold">
          {Number.isNaN(quantity) ? 0 : new Intl.NumberFormat('en-US').format(quantity * perUnit)}
        </div>
      </div>
    </div>
  )
}

export const SellCargoForm = ({
  ship,
  onSubmit,
}: {
  ship?: ShipResponse
  onSubmit: (values: SellCargoSchema) => void
}) => {
  const { waypointID } = useWaypointContext()
  const good = useMarketTradeGoodContext()
  const methods = useForm<SellCargoSchema>({
    defaultValues: { ship: ship?.symbol, item: good.symbol },
    resolver: yupResolver(validation),
  })

  const getShipOption: ShipSelect.ShipReducer = useCallback(
    (ships, ship) => {
      const disabled = ship.cargo.inventory.findIndex((item) => item.symbol === good.symbol) === -1
      const count = ship.cargo.inventory.reduce((count, item) => {
        if (item.symbol === good.symbol) count = count + item.units

        return count
      }, 0)

      return ships.set(ship.symbol, {
        ship,
        label: (
          <div className="flex items-baseline gap-2">
            <span className="font-bold">{ship.symbol}</span>
            <span className="text-secondary">
              ({TRADE_SYMBOL.get(good.symbol) ?? good.symbol}: {count})
            </span>
          </div>
        ),
        option: (
          <div className="flex flex-col">
            <div className="font-semibold">{ship.symbol}</div>
            <div className="text-secondary text-xs">
              {TRADE_SYMBOL.get(good.symbol) ?? good.symbol}: {count}
            </div>
          </div>
        ),
        disabled,
      })
    },
    [good.symbol],
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-8">
        {!ship && (
          <Controller
            control={methods.control}
            name="ship"
            render={({ field }) => (
              <QuerySuspenseBoundary fallback={<ShipSelect.Skeleton />}>
                <ShipSelect.Field
                  getShipOption={getShipOption}
                  onChange={(value) => {
                    if (value) field.onChange(value?.symbol)
                  }}
                  select={(response) => ({
                    ships: response.data.filter((ship) => ship.nav.waypointSymbol === waypointID),
                  })}
                />
              </QuerySuspenseBoundary>
            )}
          />
        )}

        <div>
          <label className="label">Quantity</label>
          <input
            {...methods.register('quantity', {
              valueAsNumber: true,
              min: 1,
              max: good.tradeVolume,
            })}
            min={1}
            max={good.tradeVolume}
            type="number"
            className="input"
          />
        </div>

        <SellPrice perUnit={good.sellPrice} />

        <SubmitPurchase />
      </form>
    </FormProvider>
  )
}

export const SellCargo = ({
  action = (props) => (
    <button className="btn btn-confirm btn-outline" {...props}>
      Sell
    </button>
  ),
}: {
  action?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}) => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const good = useMarketTradeGoodContext()
  const { mutateAsync } = useMutation({
    mutationKey: ['cargo', good.symbol, 'sell'],
    mutationFn: ({ shipID, symbol, units }: { shipID: string; symbol: string; units: number }) =>
      createShipCargoSell({ path: { shipID }, payload: { symbol, units } }),
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

  return (
    <Modal ref={ref} size="md" trigger={<Modal.Trigger disabled={good.tradeVolume === 0}>{action}</Modal.Trigger>}>
      <div className="grid gap-8">
        <div className="text-title">
          Sell: <span className="font-light">{TRADE_SYMBOL.get(good.symbol) ?? good.symbol}</span>
        </div>

        <TradeGood price={good.sellPrice} volume={good.tradeVolume} supply={good.supply} />

        <SellCargoForm
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
