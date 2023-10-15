import { type ShipSelectItemReducer } from './ship-select-field.types'

export const defaultShipItemReducer: ShipSelectItemReducer = (data, ship, _index, _source) => {
  return data.set(ship.symbol, {
    ship,
    label: ship.symbol,
    option: ship.symbol,
  })
}
