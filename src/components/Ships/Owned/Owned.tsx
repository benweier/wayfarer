import { useMemo } from 'react'
import { useMyShipsQuery } from '@/services/spacetraders/core'

interface OwnedShip {
  type: string
  manufacturer: string
  class: string
  count: number
}

const OwnedShipItem = ({ ship }: { ship: OwnedShip }) => {
  return (
    <div className="grid grid-flow-row gap-2 rounded border border-gray-700 p-4 shadow">
      <div className="grid grid-flow-row gap-6">
        <div className="grid grid-flow-col items-center justify-between">
          <div>
            <div className="text-caption">{ship.type}</div>
            <div className="text-lg font-bold">
              {ship.manufacturer} {ship.class}
            </div>
          </div>
          <div className="px-2 text-2xl font-black">{ship.count}</div>
        </div>
      </div>
    </div>
  )
}

const OwnedShipsList = () => {
  const ownedShipsQuery = useMyShipsQuery()

  const ownedShips = useMemo(() => {
    const owned = ownedShipsQuery.data?.ships.reduce<{ ships: Record<string, OwnedShip> }>(
      (obj, ship) => {
        const count = obj.ships[ship.type]?.count ?? 0

        obj.ships[ship.type] = {
          type: ship.type,
          manufacturer: ship.manufacturer,
          class: ship.class,
          count: count + 1,
        }

        return obj
      },
      { ships: {} },
    ) ?? { ships: {} }

    return { ships: Object.values(owned.ships).sort((a, b) => a.type.localeCompare(b.type)) }
  }, [ownedShipsQuery.data])

  return (
    <div className="grid grid-cols-3 gap-8">
      {ownedShips.ships.map((ship) => (
        <OwnedShipItem key={ship.type} ship={ship} />
      ))}
    </div>
  )
}

export const OwnedShips = () => {
  return (
    <div>
      <div className="my-4 text-xl font-bold">OWNED SHIPS</div>
      <OwnedShipsList />
    </div>
  )
}
