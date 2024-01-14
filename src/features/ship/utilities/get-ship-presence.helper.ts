import { type ShipResponse } from '@/types/spacetraders'

export const getShipPresence = (ships: ShipResponse[]) => {
  return new Map(
    ships.reduce<Map<string, number>>((result, ship) => {
      const { waypointSymbol } = ship.nav

      if (result.has(waypointSymbol)) {
        const count = result.get(waypointSymbol) ?? 0

        result.set(waypointSymbol, count + 1)

        return result
      }

      result.set(waypointSymbol, 1)

      return result
    }, new Map()),
  )
}
