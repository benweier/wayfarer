import { useMemo } from 'react'
import tw from 'twin.macro'
import { useMyShipsQuery } from 'services/spacetraders/core'

interface OwnedShip {
  type: string
  manufacturer: string
  class: string
  count: number
}

const OwnedShipItem = ({ ship }: { ship: OwnedShip }) => {
  return (
    <div css={tw`shadow p-4 border border-gray-700 rounded-lg grid grid-flow-row gap-2`}>
      <div css={tw`grid grid-flow-row gap-6`}>
        <div css={tw`grid grid-flow-col justify-between items-center`}>
          <div>
            <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>{ship.type}</div>
            <div css={tw`text-lg font-bold`}>
              {ship.manufacturer} {ship.class}
            </div>
          </div>
          <div css={tw`font-black text-2xl px-2`}>{ship.count}</div>
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
    <div css={tw`grid grid-cols-3 gap-8`}>
      {ownedShips.ships.map((ship) => (
        <OwnedShipItem key={ship.type} ship={ship} />
      ))}
    </div>
  )
}

export const OwnedShips = () => {
  return (
    <div>
      <div css={tw`text-xl font-bold my-4`}>OWNED SHIPS</div>
      <OwnedShipsList />
    </div>
  )
}
