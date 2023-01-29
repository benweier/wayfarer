import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, Suspense, useCallback, useMemo } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { SelectField, useSelect } from '@/components/Select'
import { PurchaseLocation } from '@/components/Ships/PurchaseLocation'
import { SystemSelect, useSystemSelect } from '@/components/Systems/Select'
import * as api from '@/services/api/spacetraders'
import { AvailableShipsResponse, Ship, System } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { groupByFn } from '@/utilities/group-by'
import { GroupByType, SortByType, getPriceRange, groups, sortShips, sorts } from '@/utilities/ships'

const ShipStat = ({ label, value }: { label: string; value: number | string }) => {
  return (
    <div className="grid grid-flow-row gap-2">
      <div className="text-center font-semibold leading-none text-gray-50">{value}</div>
      <div className="text-hint text-center">{label}</div>
    </div>
  )
}

export const AvailableShipItem = ({ ship, owned = 0, children }: PropsWithChildren<{ ship: Ship; owned?: number }>) => {
  return (
    <div
      key={ship.type}
      className="grid grid-flow-row gap-2 rounded border border-gray-700 bg-gray-700 bg-opacity-20 p-4"
    >
      <div className="grid grid-flow-row auto-rows-min gap-6">
        <div className="grid grid-cols-2 items-center">
          <div>
            <div className="text-caption">{ship.type}</div>
            <div className="text-lg font-bold">
              {ship.manufacturer} {ship.class}
            </div>
          </div>
          <div className="grid grid-flow-row items-center justify-end">
            <div className={cx('text-caption', { 'text-amber-400': owned > 0 })}>Owned {owned}</div>
            <div className="grid grid-flow-col items-center justify-end gap-1">
              <HiOutlineCash size={20} className="text-emerald-400" />
              <div className="text-xl font-black">{getPriceRange(ship)}</div>
            </div>
          </div>
        </div>
        <div className="-mx-4 grid grid-flow-col gap-2 bg-gray-400 bg-opacity-5 p-4">
          <ShipStat value={ship.maxCargo} label="CARGO" />
          <ShipStat value={ship.speed} label="SPEED" />
          <ShipStat value={ship.loadingSpeed} label="LOADING" />
          <ShipStat value={ship.weapons} label="WEAPONS" />
          <ShipStat value={ship.plating} label="PLATING" />
        </div>
        <div className="grid grid-flow-row gap-2">{children}</div>
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
  const { data } = useQuery(['ship-listings', system.symbol], () => api.shipListingsQuery({ system: system.symbol }), {
    select: useCallback(
      (response: AvailableShipsResponse) => {
        const ships = groupByFn(response.shipListings, (ship) => ship[groupBy.id])

        return Object.entries(ships).sort(([a], [b]) => a.localeCompare(b))
      },
      [groupBy.id],
    ),
  })
  const myShipsQuery = useQuery(['my-ships'], api.myShipsQuery)

  const ownedShips = useMemo(() => {
    return (
      myShipsQuery.data?.ships.reduce<Record<string, number>>((obj, ship) => {
        obj[ship.type] = (obj[ship.type] ?? 0) + 1

        return obj
      }, {}) ?? {}
    )
  }, [myShipsQuery.data])

  if (!data?.length) return null

  return (
    <div className="grid grid-cols-1 gap-10">
      {data.map(([key, ships]) => (
        <div key={key}>
          <div className="m-2 text-lg font-bold">{key}</div>
          <div className="grid grid-cols-3 gap-8">
            {ships.sort(sortShips(sortBy.id)).map((ship) => (
              <AvailableShipItem key={ship.type} ship={ship} owned={ownedShips[ship.type]}>
                <div className="text-caption">Purchase Locations</div>
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
      <div className="my-4 text-xl font-bold">AVAILABLE SHIPS</div>
      <div className="grid grid-flow-row gap-8">
        <div className="grid auto-cols-min grid-flow-col gap-4">
          <div className="w-72">
            <SystemSelect {...system} />
          </div>
          <div className="w-72">
            <SelectField label="Group By" {...groupBy} />
          </div>
          <div className="w-72">
            <SelectField label="Sort By" {...sortBy} />
          </div>
        </div>
        {system.selected && (
          <Suspense fallback={null}>
            <AvailableShipList system={system.selected} groupBy={groupBy.selected} sortBy={sortBy.selected} />
          </Suspense>
        )}
      </div>
    </div>
  )
}
