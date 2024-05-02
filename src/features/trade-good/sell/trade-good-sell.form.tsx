import { Button } from '@/components/button'
import { useWaypointResponse } from '@/context/waypoint.context'
import { ShipSelectField, type ShipSelectItemReducer } from '@/features/ship/select-field'
import type { MarketTradeGood, ShipResponse } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number.helper'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useCallback } from 'react'
import { Controller, FormProvider, useForm, useFormContext, useFormState, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TradeGoodSellSchema } from './trade-good-sell.schema'
import type { TradeGoodSellFormProps } from './trade-good-sell.types'

const ShipSelection = ({ ship, good, count }: { ship: ShipResponse; good: MarketTradeGood; count: number }) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-baseline gap-2 ">
      <span className="font-bold">{ship.symbol}</span>
      <span className="text-foreground-secondary">
        ({t(good.symbol, { ns: 'spacetraders.trade_good' })}: {count})
      </span>
    </div>
  )
}

const ShipOption = ({ ship, good, count }: { ship: ShipResponse; good: MarketTradeGood; count: number }) => {
  const { t } = useTranslation()

  return (
    <div className="typography-sm flex flex-col">
      <div className="font-semibold">{ship.symbol}</div>
      <div className="text-foreground-secondary">
        {t(good.symbol, { ns: 'spacetraders.trade_good' })}: {count}
      </div>
    </div>
  )
}

const SubmitPurchase = () => {
  const { t } = useTranslation()
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button intent="info" type="submit" className="uppercase" disabled={isSubmitting || !isValid}>
      {t('market.sell')}
    </Button>
  )
}
const SellPrice = ({ perUnit }: { perUnit: number }) => {
  const { t } = useTranslation()
  const { control } = useFormContext<TradeGoodSellSchema>()
  const quantity = useWatch({ control, name: 'quantity' })

  return (
    <div className="flex flex-wrap items-center gap-12">
      <div className="[max-width:50%]">
        <div className="text-foreground-secondary typography-sm">{t('market.sell_price')}</div>
        <div className="typography-xl truncate font-bold">{isNaN(quantity) ? 0 : formatNumber(quantity * perUnit)}</div>
      </div>
    </div>
  )
}

export const TradeGoodSellForm = ({ ship, good, onSubmit }: TradeGoodSellFormProps) => {
  const { t } = useTranslation()
  const waypoint = useWaypointResponse()
  const methods = useForm<TradeGoodSellSchema>({
    defaultValues: { ship: ship?.symbol, item: good.symbol },
    resolver: valibotResolver(
      TradeGoodSellSchema({
        max: ship?.cargo.inventory.find((item) => item.symbol === good.symbol)?.units ?? 999,
      }),
    ),
  })
  const getShipItem: ShipSelectItemReducer<{ good: MarketTradeGood; count: number }> = useCallback(
    (ships, ship) => {
      const disabled = ship.cargo.inventory.findIndex((item) => item.symbol === good.symbol) === -1
      const count = ship.cargo.inventory.reduce((count, item) => {
        if (item.symbol === good.symbol) count = count + item.units

        return count
      }, 0)

      return ships.set(ship.symbol, { ship, good, count, disabled })
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
              <div>
                <label className="label" htmlFor={field.name}>
                  {t('general.fields.ship')}
                </label>
                <ShipSelectField<{ good: MarketTradeGood; count: number }>
                  id={field.name}
                  selected={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  getShipItem={getShipItem}
                  getShipList={(ships) => ships.filter((ship) => ship.nav.waypointSymbol === waypoint.symbol)}
                  slots={{
                    Selection: ShipSelection,
                    Option: ShipOption,
                  }}
                />
              </div>
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

        <SellPrice perUnit={good.sellPrice} />

        <SubmitPurchase />
      </form>
    </FormProvider>
  )
}
