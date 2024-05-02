import type { ShipSelectItemReducer } from './ship-select-field.types'

export const defaultGetShipItem: ShipSelectItemReducer = (data, ship, _index, _source) => {
  return data.set(ship.symbol, { ship })
}
