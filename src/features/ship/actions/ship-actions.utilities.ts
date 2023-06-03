import { produce } from 'immer'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { FuelResponse, NavigationResponse, ShipCargo, ShipResponse } from '@/types/spacetraders'

export const updateShipNavStatus = produce<SpaceTradersResponse<ShipResponse>, [string]>((draft, state) => {
  draft.data.nav.status = state
})

export const updateShipInFleetNavStatus = produce<SpaceTradersResponse<ShipResponse[]>, [number, string]>(
  (draft, index, state) => {
    draft.data[index].nav.status = state
  },
)

export const updateShipNav = produce<SpaceTradersResponse<ShipResponse>, [NavigationResponse]>((draft, state) => {
  draft.data.nav = state
})

export const updateShipInFleetNav = produce<SpaceTradersResponse<ShipResponse[]>, [number, NavigationResponse]>(
  (draft, index, state) => {
    draft.data[index].nav = state
  },
)

export const updateShipCargo = produce<SpaceTradersResponse<ShipResponse>, [ShipCargo]>((draft, state) => {
  draft.data.cargo = state
})

export const updateShipInFleetCargo = produce<SpaceTradersResponse<ShipResponse[]>, [number, ShipCargo]>(
  (draft, index, state) => {
    draft.data[index].cargo = state
  },
)

export const updateShipFuel = produce<SpaceTradersResponse<ShipResponse>, [FuelResponse]>((draft, state) => {
  draft.data.fuel = state
})

export const updateShipInFleetFuel = produce<SpaceTradersResponse<ShipResponse[]>, [number, FuelResponse]>(
  (draft, index, state) => {
    draft.data[index].fuel = state
  },
)
