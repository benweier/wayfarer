import { valibotResolver } from '@hookform/resolvers/valibot'
import { cx } from 'class-variance-authority'
import { Controller, FormProvider, useForm, useFormContext, useFormState, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useWaypointResponse } from '@/context/waypoint.context'
import { ShipSelectFallback, ShipSelectField, type ShipSelectItemReducer } from '@/features/ship/select-field'
import { useAuthStore } from '@/store/auth'
import { formatNumber } from '@/utilities/number.helper'
import { TradeGoodBuySchema } from './trade-good-buy.schema'
import { type TradeGoodBuyFormProps } from './trade-good-buy.types'

const getShipItem: ShipSelectItemReducer = (ships, ship) => {
  const disabled = ship.cargo.units >= ship.cargo.capacity

  return ships.set(ship.symbol, {
    ship,
    label: (
      <div className="flex items-baseline gap-2">
        <span className="font-bold">{ship.symbol}</span>
        <span className="text-foreground-secondary">
          (Cargo: {ship.cargo.units} / {ship.cargo.capacity})
        </span>
      </div>
    ),
    option: (
      <div className="flex flex-col">
        <div className="font-bold">{ship.symbol}</div>
        <div className="text-foreground-secondary typography-xs">
          Cargo: {ship.cargo.units} / {ship.cargo.capacity}
        </div>
      </div>
    ),
    disabled,
  })
}
const TradeGoodBuySubmit = () => {
  const { t } = useTranslation()
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button intent="info" type="submit" className="uppercase" disabled={isSubmitting || !isValid}>
      {t('market.buy')}
    </Button>
  )
}
const TradeGoodBuyPrice = ({ perUnit }: { perUnit: number }) => {
  const { t } = useTranslation()
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
        <div className="text-foreground-secondary typography-xs">{t('market.purchase_price')}</div>
        <div className="typography-xl truncate font-bold">{isNaN(quantity) ? 0 : formatNumber(quantity * perUnit)}</div>
      </div>

      <div>
        <div className="text-foreground-secondary typography-xs">{t('market.available_credits')}</div>
        <div className="typography-xl truncate font-bold">{formatNumber(credits)}</div>
      </div>
    </div>
  )
}

export const TradeGoodBuyForm = ({ ship, good, onSubmit }: TradeGoodBuyFormProps) => {
  const { t } = useTranslation()
  const waypoint = useWaypointResponse()
  const methods = useForm<TradeGoodBuySchema>({
    defaultValues: {
      ship: ship?.symbol,
      item: good.symbol,
    },
    resolver: valibotResolver(TradeGoodBuySchema({ max: good.tradeVolume })),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-8">
        {ship === undefined && (
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
          <label htmlFor="quantity" className="label">
            {t('general.fields.quantity')}
          </label>
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
