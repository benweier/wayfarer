import type { Meta, SpaceTradersResponse } from '@/services/api/spacetraders/core'
import type { ShipResponse } from '@/types/spacetraders'
import type { FocusEventHandler, ReactNode } from 'react'

export type ShipSelectItem = {
  ship: ShipResponse
  label: ReactNode
  option: ReactNode
  disabled?: boolean
}

export type ShipSelectItemReducer = (
  data: Map<string, ShipSelectItem>,
  ship: ShipResponse,
  index: number,
  source: ShipResponse[],
) => Map<string, ShipSelectItem>

export type ShipSelectFieldProps = {
  id?: string
  selected?: string
  onBlur?: FocusEventHandler<HTMLButtonElement>
  onChange: (value?: string) => void
  getShipItem?: ShipSelectItemReducer
  getShipList?: (data: SpaceTradersResponse<ShipResponse[], Meta>) => { ships: ShipResponse[] }
}
