import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { myShipsQuery } from '@/services/api/spacetraders'

export const ShipsOverview = () => {
  const { data, isSuccess } = useQuery(['my-ships'], myShipsQuery)

  return (
    <div>
      {isSuccess &&
        data.ships.map((ship) => (
          <Fragment key={ship.id}>
            <div className="grid grid-flow-col items-center gap-4 rounded border border-gray-700 p-4 shadow">
              <div>
                <div className="text-caption">{ship.type}</div>
                <div className="text-body text-xl font-bold">
                  {ship.manufacturer} {ship.class}
                </div>
              </div>

              <div className="text-right">
                <div className="text-caption">Location</div>
                <div className="font-medium">{ship.location}</div>
              </div>
              <div className="text-right">
                <div className="text-caption">Cargo</div>
                <div className="font-medium">
                  <span>{ship.cargo.reduce((cargo, { totalVolume = 0 }) => cargo + totalVolume, 0)}</span>
                  <span> / </span>
                  <span>{ship.maxCargo}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-caption">Fuel</div>
                <div className="font-medium">
                  {ship.cargo.reduce((fuel, cargo) => (cargo.good === 'FUEL' ? fuel + cargo.quantity : fuel), 0)}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  )
}
