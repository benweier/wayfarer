import tw from 'twin.macro'
import { Box } from '@/components/Box'
import { Grid } from '@/components/Grid'
import { Overview } from '@/components/Overview'

export const OverviewPage = () => {
  return (
    <Box css={tw`container`}>
      <Grid rows="auto" gap={10}>
        <Overview />
      </Grid>
    </Box>
  )
}
