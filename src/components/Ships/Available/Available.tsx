import { useMemo } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import tw from 'twin.macro'
import { Select } from 'components/Select'
import { useSelect } from 'components/Select/useSelect'
import { SystemSelect } from 'components/Systems/Select'
import { useSystemSelect } from 'components/Systems/Select/useSystemSelect'
import { useShipListingsQuery } from 'services/spacetraders/core'
import { Ship, System } from 'types/spacetraders'
import { groupByFn } from 'utilities/group-by'

type GroupByType = 'manufacturer' | 'class' | 'type'
type SortByType = 'price' | 'maxCargo' | 'speed' | 'loadingSpeed' | 'plating' | 'weapons'
type SortableShipAttributes = Extract<Ship, number>

const groups: Array<{ id: GroupByType; name: string }> = [
  { id: 'class', name: 'Class' },
  { id: 'manufacturer', name: 'Manufacturer' },
]

const sorts: Array<{ id: SortByType; name: string }> = [
  { id: 'price', name: 'Price' },
  { id: 'maxCargo', name: 'Max Cargo' },
  { id: 'speed', name: 'Speed' },
  { id: 'loadingSpeed', name: 'Loading Speed' },
  { id: 'weapons', name: 'Weapons' },
  { id: 'plating', name: 'Plating' },
]

const sortByPrice = (a: Ship, b: Ship) => {
  return getPriceFrom(a, Math.min) - getPriceFrom(b, Math.max)
}

const sortByAttribute = (attr: keyof SortableShipAttributes) => (a: Ship, b: Ship) => {
  return a[attr] - b[attr]
}

const sortShips = (key: SortByType) => {
  switch (key) {
    case 'price':
      return sortByPrice

    default:
      return sortByAttribute(key)
  }
}

const getPriceFrom = (ship: Ship, getPriceFn: (...values: number[]) => number) => {
  const range = ship.purchaseLocations.map((location) => location.price)
  const price = getPriceFn(...range)

  return price
}

const getPriceRange = (ship: Ship) => {
  const range = ship.purchaseLocations.map((location) => location.price)
  const min = Math.min(...range)
  const max = Math.max(...range)

  if (min === max) return `${min}`

  return `${min}-${max}`
}

export const AvailableShipItem = ({ ship }: { ship: Ship }) => {
  return (
    <div key={ship.type} css={tw`shadow p-4 border border-gray-700 rounded-lg`}>
      <div css={tw`grid grid-flow-col gap-2 grid-template-columns[1fr 2fr 1fr] justify-between items-center`}>
        <div>
          <div css={tw`text-lg font-bold`}>{ship.type}</div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>
            {ship.manufacturer} {ship.class}
          </div>
        </div>
        <div css={tw`grid grid-flow-col gap-2`}>
          <div>
            <div css={tw`font-medium`}>{ship.maxCargo}</div>
            <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>MAX CARGO</div>
          </div>
          <div>
            <div css={tw`font-medium`}>{ship.speed}</div>
            <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>SPEED</div>
          </div>
          <div>
            <div css={tw`font-medium`}>{ship.loadingSpeed}</div>
            <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>LOADING SPEED</div>
          </div>
          <div>
            <div css={tw`font-medium`}>{ship.weapons}</div>
            <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>WEAPONS</div>
          </div>
          <div>
            <div css={tw`font-medium`}>{ship.plating}</div>
            <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>PLATING</div>
          </div>
        </div>
        <div>
          <div css={tw`flex flex-row space-x-1 items-center justify-end`}>
            <HiOutlineCash size={16} />
            <div css={tw`text-lg font-black`}>{getPriceRange(ship)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AvailableShipList = ({
  system,
  groupBy = { id: 'manufacturer', name: 'Manufacturer' },
  sortBy = { id: 'price', name: 'Price' },
}: {
  system: System
  groupBy?: { id: GroupByType; name: string }
  sortBy?: { id: SortByType; name: string }
}) => {
  const { data } = useShipListingsQuery({ system: system.symbol })
  const shipListings = useMemo(() => {
    const ships = groupByFn(data?.shipListings, (ship) => ship[groupBy.id])

    return Object.entries(ships).sort(([a], [b]) => a.localeCompare(b))
  }, [data, groupBy])

  if (!shipListings.length) return null

  return (
    <div css={tw`grid grid-cols-1 gap-10`}>
      {shipListings.map(([key, ships]) => (
        <div key={key}>
          <div css={tw`text-lg font-bold m-2`}>{key}</div>
          <div css={tw`grid grid-flow-row gap-4`}>
            {ships.sort(sortShips(sortBy.id)).map((ship) => (
              <AvailableShipItem key={ship.type} ship={ship} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const AvailableShips = () => {
  const system = useSystemSelect()
  const groupBy = useSelect(groups)
  const sortBy = useSelect(sorts)

  return (
    <div>
      <div css={tw`text-xl font-bold my-4`}>AVAILABLE SHIPS</div>
      <div css={tw`grid grid-flow-row gap-8`}>
        <div css={tw`grid grid-flow-col auto-cols-min gap-4`}>
          <div css={tw`w-72`}>
            <SystemSelect {...system} />
          </div>
          <div css={tw`w-72`}>
            <Select label="Group By" {...groupBy} />
          </div>
          <div css={tw`w-72`}>
            <Select label="Sort By" {...sortBy} />
          </div>
        </div>
        {system.selected && (
          <AvailableShipList system={system.selected} groupBy={groupBy.selected} sortBy={sortBy.selected} />
        )}
      </div>
    </div>
  )
}
