import { Fragment } from 'react'
import tw from 'twin.macro'
import { Grid } from '../Grid'
import { Typography } from '../Typography'
import { Box } from '@/components/Box'
import { Caption } from '@/components/Caption'
import { useMyShipsQuery } from '@/services/spacetraders/core'

export const ShipsOverview = () => {
  const ownedShipsQuery = useMyShipsQuery()

  return (
    <Box>
      {ownedShipsQuery.data?.ships.map((ship) => (
        <Fragment key={ship.id}>
          <Grid gap={4} css={tw`shadow p-4 border border-gray-700 rounded-lg`}>
            <Grid cols="auto" gap={4} align="center">
              <Box>
                <Caption>{ship.type}</Caption>
                <Typography size="xl" weight="bold">
                  {ship.manufacturer} {ship.class}
                </Typography>
              </Box>

              <Box css={tw`text-right`}>
                <Caption>Location</Caption>
                <Typography weight="medium">{ship.location}</Typography>
              </Box>
              <Box css={tw`text-right`}>
                <Caption>Cargo</Caption>
                <Typography weight="medium">
                  <span>{ship.cargo.reduce((cargo, { totalVolume = 0 }) => cargo + totalVolume, 0)}</span>
                  <span> / </span>
                  <span>{ship.maxCargo}</span>
                </Typography>
              </Box>
              <Box css={tw`text-right`}>
                <Caption>Fuel</Caption>
                <Typography weight="medium">
                  {ship.cargo.reduce((fuel, cargo) => (cargo.good === 'FUEL' ? fuel + cargo.quantity : fuel), 0)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Fragment>
      ))}
    </Box>
  )
}
