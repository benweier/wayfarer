import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Controller, FormProvider, useForm, useFormState, useWatch } from 'react-hook-form'
import { TradeGood } from '@/components/market'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as ShipSelect from '@/components/ship/select.component'
import { TRADE_SYMBOL } from '@/config/constants'
import { useMarketTradeGoodContext } from '@/context/market-trade-good.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { updateShipCargo, updateShipInFleetCargo } from '@/features/ship/actions'
import { createShipCargoPurchase } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { PurchaseCargoSchema, validation } from './purchase.validation'

const SubmitPurchase = () => {
  const { isSubmitting, isValid } = useFormState()

  return (
    <button type="submit" className="btn btn-primary uppercase" disabled={isSubmitting || !isValid}>
      Buy
    </button>
  )
}

const PurchasePrice = ({ perUnit }: { perUnit: number }) => {
  const { isAuthenticated, agent } = useAuthStore()
  const quantity = useWatch<{ quantity?: number }>({ name: 'quantity' }) ?? 0

  const credits = isAuthenticated ? agent.credits : 0

  return (
    <div className="flex flex-wrap items-center gap-12">
      <div
        className={cx('[max-width:50%]', {
          'text-rose-500': quantity * perUnit > credits,
        })}
      >
        <div className="text-secondary text-sm">PURCHASE PRICE</div>
        <div className="truncate text-xl font-bold">
          {Number.isNaN(quantity) ? 0 : new Intl.NumberFormat('en-US').format(quantity * perUnit)}
        </div>
      </div>

      <div>
        <div className="text-secondary text-sm">AVAILABLE CREDITS</div>
        <div className="truncate text-xl font-bold">{new Intl.NumberFormat('en-US').format(credits)}</div>
      </div>
    </div>
  )
}

const CargoForm = ({ onSubmit }: { onSubmit: (values: PurchaseCargoSchema) => void }) => {
  const { waypointID } = useWaypointContext()
  const good = useMarketTradeGoodContext()
  const methods = useForm<PurchaseCargoSchema>({
    defaultValues: { item: good.symbol },
    resolver: yupResolver(validation),
    context: { good },
  })

  const getShipOption: ShipSelect.ShipReducer = useCallback((ships, ship) => {
    const disabled = ship.cargo.units >= ship.cargo.capacity

    return ships.set(ship.symbol, {
      ship,
      label: (
        <div className="flex items-baseline gap-2">
          <span className="font-bold">{ship.symbol}</span>
          <span className="text-secondary">
            (Cargo: {ship.cargo.units} / {ship.cargo.capacity})
          </span>
        </div>
      ),
      option: (
        <div className="flex flex-col">
          <div className="font-bold">{ship.symbol}</div>
          <div className="text-secondary text-xs">
            Cargo: {ship.cargo.units} / {ship.cargo.capacity}
          </div>
        </div>
      ),
      disabled,
    })
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-8">
        <Controller
          control={methods.control}
          name="ship"
          render={({ field }) => (
            <QuerySuspenseBoundary fallback={<ShipSelect.Skeleton />}>
              <ShipSelect.Field
                getShipOption={getShipOption}
                onChange={(value) => field.onChange(value?.symbol)}
                select={(response) => ({
                  ships: response.data.filter((ship) => ship.nav.waypointSymbol === waypointID),
                })}
              />
            </QuerySuspenseBoundary>
          )}
        />

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

        <PurchasePrice perUnit={good.purchasePrice} />

        <SubmitPurchase />
      </form>
    </FormProvider>
  )
}

export const PurchaseCargo = () => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const good = useMarketTradeGoodContext()
  const { mutateAsync } = useMutation({
    mutationKey: ['cargo', good.symbol, 'purchase'],
    mutationFn: ({ shipID, item, quantity }: { shipID: string; item: string; quantity: number }) =>
      createShipCargoPurchase({ path: shipID, payload: { symbol: item, units: quantity } }),
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
    <Modal
      ref={ref}
      size="md"
      trigger={
        <Modal.Trigger disabled={good.tradeVolume === 0}>
          <button className="btn btn-outline btn-danger">Buy</button>
        </Modal.Trigger>
      }
    >
      <div className="grid gap-8">
        <div className="text-title">
          Buy: <span className="font-light">{TRADE_SYMBOL.get(good.symbol) ?? good.symbol}</span>
        </div>

        <TradeGood price={good.purchasePrice} volume={good.tradeVolume} supply={good.supply} />

        <CargoForm
          onSubmit={(values) =>
            mutateAsync({
              shipID: values.ship,
              item: values.item,
              quantity: values.quantity,
            })
          }
        />
      </div>
    </Modal>
  )
}
