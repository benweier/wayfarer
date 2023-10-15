import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Select from '@/components/select'
import { TRADE_SYMBOL } from '@/config/constants'
import { ShipSelectFallback, ShipSelectField, type ShipSelectItemReducer } from '@/features/ship/select-field'
import { type ContractDelivery, type ShipResponse } from '@/types/spacetraders'
import { type DeliverContractSchema, validation } from './deliver-contract.validation'

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

export const DeliverContractForm = ({
  deliver,
  onSubmit,
}: {
  ship?: ShipResponse
  deliver: ContractDelivery[]
  onSubmit: (values: DeliverContractSchema) => void
}) => {
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
                  name: TRADE_SYMBOL.get(item.tradeSymbol) ?? item.tradeSymbol,
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
            Deliver Contract
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
