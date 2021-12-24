import tw from 'twin.macro'
import { Box } from '@/components/Box'
import { Grid } from '@/components/Grid'
import { MarketplaceListings } from '@/components/Marketplace/Listings'

export const MarketplacePage = () => {
  return (
    <Box css={tw`container`}>
      <Grid rows="auto" gap={10}>
        <MarketplaceListings />
      </Grid>
    </Box>
  )
}
