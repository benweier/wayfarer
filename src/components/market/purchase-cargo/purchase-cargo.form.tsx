import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { Controller, FormProvider, useForm, useFormState, useWatch } from 'react-hook-form'
import { type PurchaseCargoFormProps } from '@/components/market/purchase-cargo/purchase-cargo.types'
import { type PurchaseCargoSchema, validation } from '@/components/market/purchase-cargo/purchase.validation'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as ShipSelect from '@/components/ship/select.component'
import { useWaypointResponse } from '@/context/waypoint.context'
import { useAuthStore } from '@/store/auth'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'

const SubmitPurchase = () => {
  const { isSubmitting, isValid } = useFormState()

  return (
    <button type="submit" className="btn btn-primary uppercase" disabled={isSubmitting || !isValid}>
      Buy
    </button>
  )
}
const PurchaseCargoPrice = ({ perUnit }: { perUnit: number }) => {
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
        <div className="text-secondary text-sm">Purchase Price</div>
        <div className="truncate text-xl font-bold">
          {Number.isNaN(quantity) ? 0 : formatNumber(quantity * perUnit)}
        </div>
      </div>

      <div>
        <div className="text-secondary text-sm">Available Credits</div>
        <div className="truncate text-xl font-bold">{formatNumber(credits)}</div>
      </div>
    </div>
  )
}

export const PurchaseCargoForm = ({ ship, good, onSubmit }: PurchaseCargoFormProps) => {
  const waypoint = useWaypointResponse()
  const methods = useForm<PurchaseCargoSchema>({
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

        <PurchaseCargoPrice perUnit={good.purchasePrice} />

        <SubmitPurchase />
      </form>
    </FormProvider>
  )
}
