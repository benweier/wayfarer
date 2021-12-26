import { Fragment } from 'react'
import tw from 'twin.macro'
import { Typography } from '../Typography'
import { Caption } from '@/components/Caption'
import { useMyShipsQuery } from '@/services/spacetraders/core'

export const ShipsOverview = () => {
  const ownedShipsQuery = useMyShipsQuery()

  return (
    <div>
      {ownedShipsQuery.data?.ships.map((ship) => (
        <Fragment key={ship.id}>
          <div css={tw`grid grid-flow-col gap-4 items-center shadow p-4 border border-gray-700 rounded-lg`}>
            <div>
              <Caption>{ship.type}</Caption>
              <Typography size="xl" weight="bold">
                {ship.manufacturer} {ship.class}
              </Typography>
            </div>

            <div css={tw`text-right`}>
              <Caption>Location</Caption>
              <Typography weight="medium">{ship.location}</Typography>
            </div>
            <div css={tw`text-right`}>
              <Caption>Cargo</Caption>
              <Typography weight="medium">
                <span>{ship.cargo.reduce((cargo, { totalVolume = 0 }) => cargo + totalVolume, 0)}</span>
                <span> / </span>
                <span>{ship.maxCargo}</span>
              </Typography>
            </div>
            <div css={tw`text-right`}>
              <Caption>Fuel</Caption>
              <Typography weight="medium">
                {ship.cargo.reduce((fuel, cargo) => (cargo.good === 'FUEL' ? fuel + cargo.quantity : fuel), 0)}
              </Typography>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
