import { Fragment, useMemo, ReactNode } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { O } from 'ts-toolbelt'
import tw, { theme } from 'twin.macro'
import { Button } from '@/components/Button'
import { Caption } from '@/components/Caption'
import { PurchaseGoods } from '@/components/Marketplace/PurchaseGoods'
import { MarketplaceShip } from '@/components/Marketplace/Ship'
import {
  useAvailableGoodsQuery,
  useLocationQuery,
  useMarketplaceQuery,
  useMyShipsQuery,
} from '@/services/spacetraders/core'
import { Marketplace, YourShip } from '@/types/spacetraders'
import { groupByFn } from '@/utilities/group-by'
import { formatNumber } from '@/utilities/number'

type ShipWithLocation = O.Compulsory<YourShip, 'location'>

const MarketplaceItem = ({ item, children }: { item: Marketplace; children?: ReactNode }) => {
  const { data } = useAvailableGoodsQuery()

  const good = data?.goods.find((good) => good.symbol === item.symbol)

  if (!good) return null

  return (
    <div key={good.symbol} css={tw`shadow p-4 border border-gray-700 rounded-lg grid grid-flow-row gap-4`}>
      <div css={tw`grid grid-flow-row gap-6 auto-rows-min`}>
        <div css={tw`grid grid-cols-2 items-center`}>
          <div css={tw`text-lg font-bold`}>{good.name}</div>
          <div css={tw`grid grid-flow-row items-center justify-end`}>
            <div css={tw`grid grid-flow-col gap-1 items-center justify-end`}>
              <HiOutlineCash size={20} color={theme`colors.emerald.400`} />
              <div css={tw`flex space-x-2 items-center`}>
                <span css={tw`text-xl font-black`}>{formatNumber(item.pricePerUnit)}</span>
              </div>
            </div>
            <div css={tw`grid grid-flow-col gap-1 items-center justify-end`}>
              <span css={tw`text-xs text-gray-400`}>/</span>
              <span css={tw`text-xs font-bold text-gray-200`}>{item.volumePerUnit}</span>
              <span css={tw`text-xs text-gray-400`}>{item.volumePerUnit === 1 ? 'UNIT' : 'UNITS'}</span>
            </div>
          </div>
        </div>
        <div css={tw`grid grid-flow-col gap-2 p-4 -mx-4 bg-gray-400 bg-opacity-5`}>
          <div css={tw`grid grid-flow-row gap-2`}>
            <div css={tw`font-semibold text-center leading-none text-gray-50`}>
              {formatNumber(item.quantityAvailable)}
            </div>
            <Caption css={tw`text-center`}>QTY</Caption>
          </div>
          <div css={tw`grid grid-flow-row gap-2`}>
            <div css={tw`font-semibold text-center leading-none text-gray-50`}>
              {formatNumber(item.sellPricePerUnit)}
            </div>
            <Caption css={tw`text-center`}>SELL</Caption>
          </div>
          <div css={tw`grid grid-flow-row gap-2`}>
            <div css={tw`font-semibold text-center leading-none text-gray-50`}>
              {formatNumber(item.purchasePricePerUnit)}
            </div>
            <Caption css={tw`text-center`}>BUY</Caption>
          </div>
          <div css={tw`grid grid-flow-row gap-2`}>
            <div css={tw`font-semibold text-center leading-none text-gray-50`}>{item.spread}</div>
            <Caption css={tw`text-center`}>SPREAD</Caption>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

const MarketplaceList = ({
  location,
  children,
}: {
  location: string
  children?: (marketplace: Marketplace[]) => ReactNode
}) => {
  const marketplaceQuery = useMarketplaceQuery({ location })
  const locationQuery = useLocationQuery({ location })

  if (!marketplaceQuery.data || !locationQuery.data) return null

  return (
    <div css={tw`grid grid-flow-row gap-4`}>
      <div css={tw`text-xl font-bold my-4`}>{locationQuery.data.location.name}</div>

      {children && <div>{children(marketplaceQuery.data.marketplace)}</div>}
    </div>
  )
}

export const MarketplaceListings = () => {
  const ownedShipsQuery = useMyShipsQuery()

  const shipLocations = useMemo(() => {
    const ships = groupByFn(
      ownedShipsQuery.data?.ships.filter<ShipWithLocation>((ship): ship is ShipWithLocation => !!ship.location),
      (ship) => ship.location,
    )

    return Object.entries(ships).sort(([a], [b]) => a.localeCompare(b))
  }, [ownedShipsQuery.data])

  return (
    <div css={tw`grid grid-flow-col gap-8`}>
      {shipLocations.map(([location, ships]) => (
        <Fragment key={location}>
          <MarketplaceList location={location}>
            {(marketplace) =>
              marketplace.length > 0 && (
                <div css={tw`grid grid-cols-3 gap-4`}>
                  {marketplace.map((item) => (
                    <Fragment key={item.symbol}>
                      <MarketplaceItem item={item}>
                        <div css={tw`grid grid-cols-2 gap-4`}>
                          <Button css={tw`text-white bg-rose-500 font-bold`}>BUY</Button>
                          <Button css={tw`text-white bg-emerald-500 font-bold`}>SELL</Button>
                        </div>
                      </MarketplaceItem>
                    </Fragment>
                  ))}
                </div>
              )
            }
          </MarketplaceList>
          {/* {ship.location && (
              <MarketplaceShip ship={ship}>
                <MarketplaceList location={ship.location}>
                  {(marketplace) => <PurchaseGoods ship={ship} marketplace={marketplace} />}
                </MarketplaceList>
              </MarketplaceShip>
            )} */}
        </Fragment>
      ))}
    </div>
  )
}
