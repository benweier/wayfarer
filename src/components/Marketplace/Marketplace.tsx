import tw from 'twin.macro'
import { LocationSelect, useLocationSelect } from 'components/Locations/Select'
import { SystemSelect, useSystemSelect } from 'components/Systems/Select'
import { useMarketplaceQuery } from 'services/spacetraders/core'
import { Location, Marketplace } from 'types/spacetraders'

const MarketplaceItem = ({ marketplace }: { marketplace: Marketplace }) => {
  return (
    <div css={tw`shadow p-4 border border-gray-600 rounded-lg`}>
      <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>{marketplace.symbol}</div>
    </div>
  )
}

const MarketplaceList = ({ location }: { location: Location }) => {
  const marketplaceQuery = useMarketplaceQuery({ location: location.symbol })

  if (!marketplaceQuery.data) return null

  return (
    <div css={tw`grid grid-flow-row gap-2`}>
      {marketplaceQuery.data.marketplace.map((marketplace) => {
        return <MarketplaceItem key={marketplace.symbol} marketplace={marketplace} />
      })}
    </div>
  )
}

export const MarketplaceListings = () => {
  const system = useSystemSelect()
  const location = useLocationSelect({ system: system.selected })

  return (
    <div>
      <div css={tw`text-xl font-bold my-4`}>MARKETPLACE</div>
      <div css={tw`grid grid-flow-row gap-8`}>
        <div css={tw`grid grid-flow-col auto-cols-min gap-4`}>
          <div css={tw`w-72`}>
            <SystemSelect {...system} />
          </div>
          <div css={tw`w-72`}>
            <LocationSelect {...location} />
          </div>
        </div>
      </div>

      {location.selected && <MarketplaceList location={location.selected} />}
    </div>
  )
}
