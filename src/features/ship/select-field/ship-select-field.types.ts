import type { ShipResponse } from '@/types/spacetraders'
import type { FC, FocusEventHandler } from 'react'

export type ShipSelectItem<T> = {
  ship: ShipResponse
  disabled?: boolean
} & T

export type ShipSelectItemReducer<T extends Record<string, any> = any> = (
  data: Map<string, ShipSelectItem<T>>,
  ship: ShipResponse,
  index: number,
  source: ShipResponse[],
) => Map<string, ShipSelectItem<T>>

export type ShipSelectFieldProps<
  T extends Record<string, any> = any,
  SelectionComponent extends FC<{ ship: ShipResponse } & T> = FC<{ ship: ShipResponse } & T>,
  OptionComponent extends FC<{ ship: ShipResponse } & T> = FC<{ ship: ShipResponse } & T>,
> = {
  id?: string
  selected?: string
  onBlur?: FocusEventHandler<HTMLButtonElement>
  onChange: (value?: string) => void
  slots?: {
    Selection?: SelectionComponent
    Option?: OptionComponent
  }
  getShipItem?: ShipSelectItemReducer<T>
  getShipList?: (ships: ShipResponse[]) => ShipResponse[]
}
