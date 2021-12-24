import tw from 'twin.macro'
import { Box } from '@/components/Box'
import { Grid } from '@/components/Grid'
import { AvailableShips } from '@/components/Ships/Available'
import { OwnedShips } from '@/components/Ships/Owned'

export const ShipPage = () => {
  return (
    <Box css={tw`container`}>
      <Grid rows="auto" gap={10}>
        <OwnedShips />
        <AvailableShips />
      </Grid>
    </Box>
  )
}
