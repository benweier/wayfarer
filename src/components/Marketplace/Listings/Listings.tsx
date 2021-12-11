import { Fragment, useMemo, ReactNode } from 'react'
import tw from 'twin.macro'
import { PurchaseGoods } from '@/components/Marketplace/PurchaseGoods'
import { MarketplaceShip } from '@/components/Marketplace/Ship'
import { useMarketplaceQuery, useMyShipsQuery } from '@/services/spacetraders/core'
import { Marketplace } from '@/types/spacetraders'

// const MarketplaceItem = ({ marketplace }: { marketplace: Marketplace }) => {
//   return (
//     <div css={tw`shadow p-4 border border-gray-600 rounded-lg`}>
//       <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>{marketplace.symbol}</div>
//     </div>
//   )
// }

const MarketplaceList = ({
  location,
  children,
}: {
  location: string
  children: (marketplace: Marketplace[]) => ReactNode
}) => {
  const marketplaceQuery = useMarketplaceQuery({ location })

  if (!marketplaceQuery.data) return null

  return <>{children(marketplaceQuery.data.marketplace)}</>
}

export const MarketplaceListings = () => {
  const ownedShipsQuery = useMyShipsQuery()

  const ownedShips = useMemo(() => {
    return ownedShipsQuery.data?.ships.sort((a, b) => a.class.localeCompare(b.class)) ?? []
  }, [ownedShipsQuery.data])

  return (
    <div>
      <div css={tw`text-xl font-bold my-4`}>MARKETPLACE</div>
      <div css={tw`grid grid-flow-row gap-8`}>
        {ownedShips.map((ship) => (
          <Fragment key={ship.id}>
            {ship.location && (
              <MarketplaceShip ship={ship}>
                <MarketplaceList location={ship.location}>
                  {(marketplace) => <PurchaseGoods ship={ship} marketplace={marketplace} />}
                </MarketplaceList>
              </MarketplaceShip>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
