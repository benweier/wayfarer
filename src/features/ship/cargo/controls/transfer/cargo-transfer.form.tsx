import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ShipSelectField } from '@/features/ship/select-field'
import { CargoTransferSchema } from './cargo-transfer.validation'
import type { ShipResponse } from '@/types/spacetraders'
import type { PropsWithChildren } from 'react'

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
              <div>
                <label className="label" htmlFor={field.name}>
                  {t('general.fields.ship')}
                </label>
                <ShipSelectField
                  {...field}
                  getShipList={(ships) =>
                    ships.filter((ship) => {
                      return (
                        ship.cargo.capacity - ship.cargo.units > 0 &&
                        ship.symbol !== fromShip.symbol &&
                        ship.nav.waypointSymbol === fromShip.nav.waypointSymbol
                      )
                    })
                  }
                />
              </div>
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
