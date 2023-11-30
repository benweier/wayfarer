import { useSuspenseQuery } from '@tanstack/react-query'
import * as Select from '@/components/select'
import { getShipListQuery } from '@/services/api/spacetraders'
import { defaultGetShipItem } from './ship-item-reducer.helper'
import { type ShipSelectFieldProps, type ShipSelectItem } from './ship-select-field.types'

export const ShipSelectField = ({
  getShipList = (response) => ({ ships: response.data }),
  onChange,
  getShipItem = defaultGetShipItem,
}: ShipSelectFieldProps) => {
  const { data } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    select: getShipList,
  })
  const state: Map<string, ShipSelectItem> = data.ships.reduce<Map<string, ShipSelectItem>>(getShipItem, new Map())

  return (
    <Select.Field
      label={<Select.Label>Ship</Select.Label>}
      by={(a, z) => a?.symbol === z?.symbol}
      onChange={onChange}
      getItemKey={(ship) => ship.symbol}
      getItemLabel={(ship) => (ship ? state.get(ship.symbol)?.label : undefined)}
      getItemOption={(ship) => state.get(ship.symbol)?.option}
      getItemDisabled={(ship) => state.get(ship.symbol)?.disabled}
      options={data.ships}
    />
  )
}
