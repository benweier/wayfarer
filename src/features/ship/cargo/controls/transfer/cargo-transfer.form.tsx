import { valibotResolver } from '@hookform/resolvers/valibot'
import { type PropsWithChildren } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ShipSelectFallback, ShipSelectField, type ShipSelectItemReducer } from '@/features/ship/select-field'
import { type ShipResponse } from '@/types/spacetraders'
import { CargoTransferSchema } from './cargo-transfer.validation'

const getShipOption: ShipSelectItemReducer = (ships, ship) => {
  return ships.set(ship.symbol, {
    ship,
    label: (
      <div className="flex items-baseline gap-2">
        <span className="font-bold">{ship.symbol}</span>
      </div>
    ),
    option: (
      <div className="flex flex-col">
        <div className="font-semibold">{ship.symbol}</div>
      </div>
    ),
  })
}

export const CargoTransferForm = ({
  fromShip,
  onSubmit,
  children,
}: PropsWithChildren<{ fromShip: ShipResponse; onSubmit: (values: CargoTransferSchema) => void }>) => {
  const { t } = useTranslation()
  const methods = useForm<CargoTransferSchema>({
    resolver: valibotResolver(CargoTransferSchema),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <Controller
            control={methods.control}
            name="ship"
            render={({ field }) => (
              <QuerySuspenseBoundary fallback={<ShipSelectFallback />}>
                <ShipSelectField
                  getShipItem={getShipOption}
                  onChange={(value) => {
                    if (value) field.onChange(value.symbol)
                  }}
                  getShipList={(response) => ({
                    ships: response.data.filter((ship) => {
                      return (
                        ship.cargo.capacity - ship.cargo.units > 0 &&
                        ship.symbol !== fromShip.symbol &&
                        ship.nav.waypointSymbol === fromShip.nav.waypointSymbol
                      )
                    }),
                  })}
                />
              </QuerySuspenseBoundary>
            )}
          />
        </div>

        <div>
          <label className="label">{t('general.fields.quantity')}</label>
          <input
            {...methods.register('quantity', {
              valueAsNumber: true,
            })}
            type="number"
            className="input"
          />
        </div>

        {children}
      </form>
    </FormProvider>
  )
}
