import * as Select from '@/components/select'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { defaultGetShipItem } from './ship-item-reducer.helper'
import type { ShipSelectFieldProps, ShipSelectItem } from './ship-select-field.types'

export const ShipSelectField = ({
  id,
  selected,
  onBlur,
  onChange,
  getShipList = (response) => ({ ships: response.data }),
  getShipItem = defaultGetShipItem,
}: ShipSelectFieldProps) => {
  const { t } = useTranslation()
  const { data, isSuccess } = useQuery({ ...getShipListQuery(), select: getShipList })
  const ships: Map<string, ShipSelectItem> = isSuccess
    ? data.ships.reduce<Map<string, ShipSelectItem>>(getShipItem, new Map())
    : new Map()

  return (
    <Select.Field
      id={id}
      selected={(selected && ships.get(selected)?.label) ?? selected}
      placeholder={t('ship.select_placeholder')}
      onChange={onChange}
      onBlur={onBlur}
    >
      {Array.from(ships).map(([key, item]) => {
        return (
          <Select.Item key={key} value={item.ship.symbol} disabled={item.disabled}>
            {item.option}
          </Select.Item>
        )
      })}
    </Select.Field>
  )
}
