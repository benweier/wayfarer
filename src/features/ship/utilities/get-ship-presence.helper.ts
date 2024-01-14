import { type ShipResponse } from '@/types/spacetraders'

export const getShipPresence = (ships: ShipResponse[], property: 'systemSymbol' | 'waypointSymbol') => {
  return new Map(
    ships.reduce<Map<string, number>>((result, ship) => {
      const value = ship.nav[property]

      if (result.has(value)) {
        const count = result.get(value) ?? 0

        result.set(value, count + 1)

        return result
      }

      result.set(value, 1)

      return result
    }, new Map()),
  )
}
