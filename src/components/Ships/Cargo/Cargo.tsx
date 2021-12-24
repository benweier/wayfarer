import { Fragment, ReactNode } from 'react'
import { Box } from '@/components/Box'
import { Grid } from '@/components/Grid'
import { useAvailableGoodsQuery } from '@/services/spacetraders/core'
import { YourShip } from '@/types/spacetraders'

export const ShipCargo = ({ ship, children }: { ship: YourShip; children?: ReactNode }) => {
  const { data } = useAvailableGoodsQuery()

  return (
    <Box>
      {ship.cargo.map((cargo) => (
        <Fragment key={cargo.good}>
          <Grid rows="auto" gap={4}>
            <span>{data?.goods.find((good) => good.symbol === cargo.good)?.name}</span>
            <span>{cargo.totalVolume}</span>
          </Grid>
        </Fragment>
      ))}

      {children}
    </Box>
  )
}
