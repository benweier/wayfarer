import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Select from '@/components/select'
import { ShipSelectFallback, ShipSelectField, type ShipSelectItemReducer } from '@/features/ship/select-field'
import { type ContractDelivery, type ShipResponse } from '@/types/spacetraders'
import { type DeliverContractSchema, validation } from './contract-deliver.validation'

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
    resolver: yupResolver(validation),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-8">
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
                  ships: response.data,
                })}
              />
            </QuerySuspenseBoundary>
          )}
        />

        <div>
          <Controller
            control={methods.control}
            name="item"
            render={({ field }) => (
              <Select.Field
                label={<Select.Label>Item</Select.Label>}
                by={(a, z) => a?.symbol === z?.symbol}
                onChange={(value) => {
                  if (value) field.onChange(value.symbol)
                }}
                getItemKey={(item) => item.symbol}
                getItemLabel={(item) => item?.name}
                getItemOption={(item) => item.name}
                options={deliver.map((item) => ({
                  symbol: item.tradeSymbol,
                  name: t(item.tradeSymbol, { ns: 'spacetraders.trade_good' }),
                }))}
              />
            )}
          />
        </div>

        <div>
          <label className="label">Quantity</label>
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
