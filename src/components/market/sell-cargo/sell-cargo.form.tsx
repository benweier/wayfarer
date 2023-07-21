import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { Controller, FormProvider, useForm, useFormState, useWatch } from 'react-hook-form'
import { type SellCargoSchema, validation } from '@/components/market/sell-cargo/sell.validation'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as ShipSelect from '@/components/ship/select.component'
import { TRADE_SYMBOL } from '@/config/constants'
import { useWaypointContext } from '@/context/waypoint.context'
import { type SellCargoFormProps } from './sell-cargo.types'

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
        <div className="text-secondary text-sm">Sell Price</div>
        <div className="truncate text-xl font-bold">
          {Number.isNaN(quantity) ? 0 : new Intl.NumberFormat('en-US').format(quantity * perUnit)}
        </div>
      </div>
    </div>
  )
}

export const SellCargoForm = ({ ship, good, onSubmit }: SellCargoFormProps) => {
  const { waypointSymbol } = useWaypointContext()
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
                    if (value) field.onChange(value.symbol)
                  }}
                  select={(response) => ({
                    ships: response.data.filter((ship) => ship.nav.waypointSymbol === waypointSymbol),
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
