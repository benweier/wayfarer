import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Controller, FormProvider, useForm, useFormState, useWatch } from 'react-hook-form'
import { TradeGood } from '@/components/Market/TradeGood'
import { Modal } from '@/components/Modal'
import { QuerySuspenseBoundary } from '@/components/QuerySuspenseBoundary'
import * as ShipSelect from '@/components/Ship/Select'
import { TRADE_SYMBOL } from '@/config/constants'
import { useMarketTradeGoodContext } from '@/context/MarketTradeGood'
import { useSystemWaypointContext } from '@/context/SystemWaypoint'
import { createShipCargoPurchase } from '@/services/api/spacetraders'
import { useAuthStore } from '@/services/store/auth'
import { cx } from '@/utilities/cx'
import { PurchaseCargoSchema, validation } from './Purchase.validation'

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
  const waypointID = useSystemWaypointContext((state) => state.waypointID)
  const good = useMarketTradeGoodContext((state) => state)
  const methods = useForm<PurchaseCargoSchema>({
    defaultValues: { item: good.symbol },
    resolver: yupResolver(validation),
    context: { good },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-8">
        <Controller
          control={methods.control}
          name="ship"
          render={({ field }) => (
            <QuerySuspenseBoundary fallback={<ShipSelect.Skeleton />}>
              <ShipSelect.Field
                stateReducer={(ships) => {
                  return ships.reduce<Map<string, ShipSelect.ShipItemState>>((map, ship) => {
                    const disabled = ship.cargo.units >= ship.cargo.capacity

                    return map.set(ship.symbol, {
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
                  }, new Map())
                }}
                onChange={field.onChange}
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
  const good = useMarketTradeGoodContext((state) => state)
  const { mutateAsync } = useMutation({
    mutationKey: ['cargo', good.symbol, 'purchase'],
    mutationFn: ({ shipID, item, quantity }: { shipID: string; item: string; quantity: number }) =>
      createShipCargoPurchase({ path: shipID, payload: { symbol: item, units: quantity } }),
  })

  return (
    <Modal size="md" trigger={<Modal.Trigger as={<button className="btn btn-outline btn-danger">Buy</button>} />}>
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
