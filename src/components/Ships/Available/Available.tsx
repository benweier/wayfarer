import { useMemo, FC } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import tw, { theme } from 'twin.macro'
import { Caption } from '@/components/Caption'
import { SelectField, useSelect } from '@/components/Select'
import { PurchaseLocation } from '@/components/Ships/PurchaseLocation'
import { SystemSelect, useSystemSelect } from '@/components/Systems/Select'
import { useMyShipsQuery, useShipListingsQuery } from '@/services/spacetraders/core'
import { Ship, System } from '@/types/spacetraders'
import { groupByFn } from '@/utilities/group-by'
import { getPriceRange, GroupByType, groups, SortByType, sorts, sortShips } from '@/utilities/ships'

const ShipStat = ({ label, value }: { label: string; value: number | string }) => {
  return (
    <div css={tw`grid grid-flow-row gap-2`}>
      <div css={tw`font-semibold text-center leading-none text-gray-50`}>{value}</div>
      <Caption css={tw`text-center`}>{label}</Caption>
    </div>
  )
}

export const AvailableShipItem: FC<{ ship: Ship; owned?: number }> = ({ ship, owned = 0, children }) => {
  return (
    <div key={ship.type} css={tw`shadow p-4 border border-gray-700 rounded-lg grid grid-flow-row gap-2`}>
      <div css={tw`grid grid-flow-row gap-6 auto-rows-min`}>
        <div css={tw`grid grid-cols-2 items-center`}>
          <div>
            <Caption>{ship.type}</Caption>
            <div css={tw`text-lg font-bold`}>
              {ship.manufacturer} {ship.class}
            </div>
          </div>
          <div css={tw`grid grid-flow-row items-center justify-end`}>
            <Caption css={[owned > 0 && tw`text-amber-400`]}>Owned {owned}</Caption>
            <div css={tw`grid grid-flow-col gap-1 items-center justify-end`}>
              <HiOutlineCash size={20} color={theme`colors.emerald.400`} />
              <div css={tw`text-xl font-black`}>{getPriceRange(ship)}</div>
            </div>
          </div>
        </div>
        <div css={tw`grid grid-flow-col gap-2 p-4 -mx-4 bg-gray-400 bg-opacity-5`}>
          <ShipStat value={ship.maxCargo} label="MAX CARGO" />
          <ShipStat value={ship.speed} label="SPEED" />
          <ShipStat value={ship.loadingSpeed} label="LOADING SPEED" />
          <ShipStat value={ship.weapons} label="WEAPONS" />
          <ShipStat value={ship.plating} label="PLATING" />
        </div>
        <div css={tw`grid grid-flow-row gap-2`}>{children}</div>
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
  const shipListingsQuery = useShipListingsQuery({ system: system.symbol })
  const myShipsQuery = useMyShipsQuery()

  const ownedShips = useMemo(() => {
    return (
      myShipsQuery.data?.ships.reduce<Record<string, number>>((obj, ship) => {
        obj[ship.type] = (obj[ship.type] ?? 0) + 1

        return obj
      }, {}) ?? {}
    )
  }, [myShipsQuery.data])

  const shipListings = useMemo(() => {
    const ships = groupByFn(shipListingsQuery.data?.shipListings, (ship) => ship[groupBy.id])

    return Object.entries(ships).sort(([a], [b]) => a.localeCompare(b))
  }, [shipListingsQuery.data, groupBy])

  if (!shipListings.length) return null

  return (
    <div css={tw`grid grid-cols-1 gap-10`}>
      {shipListings.map(([key, ships]) => (
        <div key={key}>
          <div css={tw`text-lg font-bold m-2`}>{key}</div>
          <div css={tw`grid grid-cols-2 gap-8`}>
            {ships.sort(sortShips(sortBy.id)).map((ship) => (
              <AvailableShipItem key={ship.type} ship={ship} owned={ownedShips[ship.type]}>
                <Caption>Purchase Locations</Caption>
                {ship.purchaseLocations.map((purchase) => (
                  <PurchaseLocation
                    key={purchase.location}
                    type={ship.type}
                    location={purchase.location}
                    price={purchase.price}
                  />
                ))}
              </AvailableShipItem>
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
            <SelectField label="Group By" {...groupBy} />
          </div>
          <div css={tw`w-72`}>
            <SelectField label="Sort By" {...sortBy} />
          </div>
        </div>
        {system.selected && (
          <AvailableShipList system={system.selected} groupBy={groupBy.selected} sortBy={sortBy.selected} />
        )}
      </div>
    </div>
  )
}
