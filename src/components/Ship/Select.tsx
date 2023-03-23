import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import * as Select from '@/components/Select'
import { getShipsList } from '@/services/api/spacetraders'
import { Meta, SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'

export type ShipItemState = {
  ship: ShipResponse
  label: ReactNode
  option: ReactNode
  disabled?: boolean
}

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

const defaultStateReducer = (data: ShipResponse[] = []): Map<string, ShipItemState> => {
  return data.reduce<Map<string, ShipItemState>>((map, ship) => {
    return map.set(ship.symbol, {
      ship,
      label: ship.symbol,
      option: ship.symbol,
    })
  }, new Map())
}

export const Field = ({
  select = (response) => ({ ships: response.data }),
  onChange,
  stateReducer = defaultStateReducer,
}: {
  select?: (data: SpaceTradersResponse<ShipResponse[], Meta>) => { ships: ShipResponse[] }
  onChange: (value?: ShipResponse | null) => void
  stateReducer?: (data: ShipResponse[]) => Map<string, ShipItemState>
}) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['ships'],
    queryFn: () => getShipsList(),
    select,
  })

  const state = isSuccess ? stateReducer(data.ships) : new Map()

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
