import * as Select from '@/components/select'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { defaultGetShipItem } from './ship-item-reducer.helper'
import type { ShipSelectFieldProps, ShipSelectItem } from './ship-select-field.types'
import { ShipOption, ShipSelection } from './ship-select-slots.component'

export const ShipSelectField = <T extends Record<string, unknown>>({
  name,
  value,
  onBlur,
  onChange,
  getShipList = (ships) => ships,
  getShipItem = defaultGetShipItem,
  slots: { Selection = ShipSelection, Option = ShipOption } = {},
}: ShipSelectFieldProps<T>) => {
  const { t } = useTranslation()
  const { data, isSuccess } = useQuery({ ...getShipListQuery(), select: (response) => getShipList(response.data) })
  const ships: ReadonlyMap<string, ShipSelectItem<T>> = isSuccess ? data.reduce(getShipItem, new Map()) : new Map()
  const selected = value && ships.has(value) ? ships.get(value) : undefined

  return (
    <Select.Field
      id={name}
      selected={selected && <Selection {...selected} />}
      placeholder={t('ship.select_placeholder')}
      onChange={onChange}
      onBlur={onBlur}
    >
      {Array.from(ships).map(([key, item]) => {
        return (
          <Select.Item key={key} value={item.ship.symbol} disabled={item.disabled}>
            <Option {...item} />
          </Select.Item>
        )
      })}
    </Select.Field>
  )
}
