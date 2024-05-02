import * as Select from '@/components/select'
import { ShipSelectField } from '@/features/ship/select-field'
import type { ContractDelivery, ShipResponse } from '@/types/spacetraders'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DeliverContractSchema } from './contract-deliver.schema'

export const ContractDeliverForm = ({
  deliver,
  onSubmit,
}: {
  ship?: ShipResponse
  deliver: ContractDelivery[]
  onSubmit: (values: DeliverContractSchema) => void
}) => {
  const { t } = useTranslation()
  const methods = useForm<DeliverContractSchema>({
    resolver: valibotResolver(DeliverContractSchema),
  })
  const items = reduceArrayToMap(
    deliver.toSorted((a, z) => a.tradeSymbol.localeCompare(z.tradeSymbol)),
    'tradeSymbol',
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-8">
        <Controller
          control={methods.control}
          name="ship"
          render={({ field }) => (
            <div>
              <label className="label" htmlFor={field.name}>
                {t('general.fields.ship')}
              </label>
              <ShipSelectField {...field} />
            </div>
          )}
        />

        <div>
          <Controller
            control={methods.control}
            name="item"
            render={({ field }) => {
              const selected = items.get(field.value)

              return (
                <div>
                  <label className="label" htmlFor={field.name}>
                    Item
                  </label>
                  <Select.Field
                    id={field.name}
                    selected={
                      field.value &&
                      selected && (
                        <div className="text-foreground-primary">
                          {t(selected.tradeSymbol, { ns: 'spacetraders.trade_good' })}
                        </div>
                      )
                    }
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {Array.from(items).map(([key, item]) => {
                      return (
                        <Select.Item key={key} value={item.tradeSymbol}>
                          {t(item.tradeSymbol, { ns: 'spacetraders.trade_good' })}
                        </Select.Item>
                      )
                    })}
                  </Select.Field>
                </div>
              )
            }}
          />
        </div>

        <div>
          <label htmlFor="quantity" className="label">
            Quantity
          </label>
          <input
            {...methods.register('quantity', {
              valueAsNumber: true,
            })}
            type="number"
            className="input"
          />
        </div>

        <div>
          <button type="submit" className="btn btn-confirm w-full">
            Deliver
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
