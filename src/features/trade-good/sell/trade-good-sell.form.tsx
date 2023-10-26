import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { Controller, FormProvider, useForm, useFormContext, useFormState, useWatch } from 'react-hook-form'
import { Button } from '@/components/button'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { TRADE_SYMBOL } from '@/config/constants'
import { useWaypointResponse } from '@/context/waypoint.context'
import { ShipSelectFallback, ShipSelectField, type ShipSelectItemReducer } from '@/features/ship/select-field'
import { type TradeGoodSellFormProps } from './trade-good-sell.types'
import { type TradeGoodSellSchema, validation } from './trade-good-sell.validation'

const SubmitPurchase = () => {
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button intent="primary" type="submit" className="uppercase" disabled={isSubmitting || !isValid}>
      Sell
    </Button>
  )
}
const SellPrice = ({ perUnit }: { perUnit: number }) => {
  const { control } = useFormContext<TradeGoodSellSchema>()
  const quantity = useWatch({ control, name: 'quantity' })

  return (
    <div className="flex flex-wrap items-center gap-12">
      <div className="[max-width:50%]">
        <div className="text-secondary text-sm">Sell Price</div>
        <div className="truncate text-xl font-bold">
          {isNaN(quantity) ? 0 : new Intl.NumberFormat('en-US').format(quantity * perUnit)}
        </div>
      </div>
    </div>
  )
}

export const TradeGoodSellForm = ({ ship, good, onSubmit }: TradeGoodSellFormProps) => {
  const waypoint = useWaypointResponse()
  const methods = useForm<TradeGoodSellSchema>({
    defaultValues: { ship: ship?.symbol, item: good.symbol },
    resolver: yupResolver(validation),
  })
  const getShipItem: ShipSelectItemReducer = useCallback(
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
              ({TRADE_SYMBOL.get(good.symbol)}: {count})
            </span>
          </div>
        ),
        option: (
          <div className="flex flex-col">
            <div className="font-semibold">{ship.symbol}</div>
            <div className="text-secondary text-xs">
              {TRADE_SYMBOL.get(good.symbol)}: {count}
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
              <QuerySuspenseBoundary fallback={<ShipSelectFallback />}>
                <ShipSelectField
                  getShipItem={getShipItem}
                  onChange={(value) => {
                    if (value) field.onChange(value.symbol)
                  }}
                  getShipList={(response) => ({
                    ships: response.data.filter((ship) => ship.nav.waypointSymbol === waypoint.symbol),
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
