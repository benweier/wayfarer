import tw from 'twin.macro'
import { useMarketplaceQuery } from 'services/spacetraders/core'
import { Marketplace } from 'types/spacetraders'

const MarketplaceItem = ({ marketplace }: { marketplace: Marketplace }) => {
  return (
    <div css={tw`shadow p-4 border border-gray-600 rounded-lg`}>
      <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>{marketplace.symbol}</div>
    </div>
  )
}

export const MarketplaceListings = () => {
  const marketplaceQuery = useMarketplaceQuery({ location: 'OE-PM-TR' })

  return (
    <div css={tw`grid grid-flow-row gap-2`}>
      {marketplaceQuery.data?.marketplace.map((marketplace) => {
        return <MarketplaceItem key={marketplace.symbol} marketplace={marketplace} />
      })}
    </div>
  )
}
