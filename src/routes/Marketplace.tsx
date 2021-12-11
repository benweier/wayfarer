import tw from 'twin.macro'
import { MarketplaceListings } from '@/components/Marketplace/Listings'

export const MarketplacePage = () => {
  return (
    <div css={tw`container`}>
      <div css={tw`grid grid-flow-row gap-10`}>
        <MarketplaceListings />
      </div>
    </div>
  )
}
