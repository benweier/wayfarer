import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { Controller, FormProvider, useForm, useFormContext, useFormState, useWatch } from 'react-hook-form'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as ShipSelect from '@/components/ship/select.component'
import { useWaypointResponse } from '@/context/waypoint.context'
import { useAuthStore } from '@/store/auth'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'
import { type TradeGoodBuyFormProps } from './trade-good-buy.types'
import { type TradeGoodBuySchema, validation } from './trade-good-buy.validation'

const TradeGoodBuySubmit = () => {
  const { isSubmitting, isValid } = useFormState()

  return (
    <button type="submit" className="btn btn-primary uppercase" disabled={isSubmitting || !isValid}>
      Buy
    </button>
  )
}
const TradeGoodBuyPrice = ({ perUnit }: { perUnit: number }) => {
  const { control } = useFormContext<TradeGoodBuySchema>()
  const { isAuthenticated, agent } = useAuthStore()
  const quantity = useWatch({ control, name: 'quantity' })
  const credits = isAuthenticated ? agent.credits : 0

  return (
    <div className="flex flex-wrap items-center gap-12">
      <div
        className={cx('[max-width:50%]', {
          'text-rose-500': quantity * perUnit > credits,
        })}
      >
        <div className="text-secondary text-sm">Purchase Price</div>
        <div className="truncate text-xl font-bold">{isNaN(quantity) ? 0 : formatNumber(quantity * perUnit)}</div>
      </div>

      <div>
        <div className="text-secondary text-sm">Available Credits</div>
        <div className="truncate text-xl font-bold">{formatNumber(credits)}</div>
      </div>
    </div>
  )
}

export const TradeGoodBuyForm = ({ ship, good, onSubmit }: TradeGoodBuyFormProps) => {
  const waypoint = useWaypointResponse()
  const methods = useForm<TradeGoodBuySchema>({
    defaultValues: { ship: ship?.symbol, item: good.symbol },
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
        {ship === undefined && (
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

        <TradeGoodBuyPrice perUnit={good.purchasePrice} />

        <TradeGoodBuySubmit />
      </form>
    </FormProvider>
  )
}
