import { useQuery } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import * as Select from '@/components/select'
import { getShipListQuery } from '@/services/api/spacetraders'
import { type Meta, type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'

export type ShipItem = {
  ship: ShipResponse
  label: ReactNode
  option: ReactNode
  disabled?: boolean
}

export type ShipReducer = (
  data: Map<string, ShipItem>,
  ship: ShipResponse,
  index: number,
  source: ShipResponse[],
) => Map<string, ShipItem>

export const Skeleton = () => {
  return (
    <div>
      <label className="label">Ship</label>
      <div className="select">
        <div className="select-placeholder">
          <div className="h-2 w-1/2 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </div>
    </div>
  )
}

const defaultReducer: ShipReducer = (data, ship, _index, _source) => {
  return data.set(ship.symbol, {
    ship,
    label: ship.symbol,
    option: ship.symbol,
  })
}

export const Field = ({
  select = (response) => ({ ships: response.data }),
  onChange,
  getShipOption = defaultReducer,
}: {
  select?: (data: SpaceTradersResponse<ShipResponse[], Meta>) => { ships: ShipResponse[] }
  onChange: (value?: ShipResponse | null) => void
  getShipOption?: ShipReducer
}) => {
  const { data, isSuccess } = useQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    select,
  })

  const state: Map<string, ShipItem> = isSuccess
    ? data.ships.reduce<Map<string, ShipItem>>(getShipOption, new Map())
    : new Map()

  return (
    <Select.Field
      label={<Select.Label>Ship</Select.Label>}
      by={(a, z) => a?.symbol === z?.symbol}
      onChange={onChange}
      getItemKey={(ship) => ship.symbol}
      getItemLabel={(ship) => (ship ? state.get(ship.symbol)?.label : undefined)}
      getItemOption={(ship) => state.get(ship.symbol)?.option}
      getItemDisabled={(ship) => state.get(ship.symbol)?.disabled}
      options={isSuccess ? data.ships : []}
    />
  )
}
