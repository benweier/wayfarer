import { Fragment, ReactNode, useMemo } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { O } from 'ts-toolbelt'
import { PurchaseGoods } from '@/components/Marketplace/PurchaseGoods'
import { Dialog, Modal } from '@/components/Modal'
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

const MarketplaceItem = ({ item, children }: WithChildren<{ item: Marketplace }>) => {
  const { data } = useAvailableGoodsQuery()

  const good = data?.goods.find((good) => good.symbol === item.symbol)

  if (!good) return null

  return (
    <div key={good.symbol} className="grid grid-flow-row gap-4 rounded border border-gray-700 p-4 shadow">
      <div className="grid grid-flow-row auto-rows-min gap-6">
        <div className="grid grid-cols-2 items-center">
          <div className="text-lg font-bold">{good.name}</div>
          <div className="grid grid-flow-row items-center justify-end">
            <div className="grid grid-flow-col items-center justify-end gap-1">
              <HiOutlineCash size={20} className="text-emerald-400" />
              <div className="text-xl font-black">{formatNumber(item.pricePerUnit)}</div>
            </div>
            <div className="grid grid-flow-col items-center justify-end gap-1">
              <span className="text-xs text-gray-400">/</span>
              <span className="text-xs font-bold text-gray-200">{item.volumePerUnit}</span>
              <span className="text-xs text-gray-400">{item.volumePerUnit === 1 ? 'UNIT' : 'UNITS'}</span>
            </div>
          </div>
        </div>
        <div className="-mx-4 grid grid-flow-col gap-2 bg-gray-400 bg-opacity-5 p-4">
          <div className="grid grid-flow-row gap-2">
            <div className="text-center font-semibold leading-none text-gray-50">
              {formatNumber(item.quantityAvailable)}
            </div>
            <div className="text-caption text-center">QTY</div>
          </div>
          <div className="grid grid-flow-row gap-2">
            <div className="text-center font-semibold leading-none text-gray-50">
              {formatNumber(item.purchasePricePerUnit)}
            </div>
            <div className="text-caption text-center">BUY</div>
          </div>
          <div className="grid grid-flow-row gap-2">
            <div className="text-center font-semibold leading-none text-gray-50">
              {formatNumber(item.sellPricePerUnit)}
            </div>
            <div className="text-caption text-center">SELL</div>
          </div>
          <div className="grid grid-flow-row gap-2">
            <div className="text-center font-semibold leading-none text-gray-50">{item.spread}</div>
            <div className="text-caption text-center">SPREAD</div>
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
    <div className="grid grid-flow-row gap-4">
      <div className="my-4 text-xl font-bold">{locationQuery.data.location.name}</div>

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
    <div className="grid grid-flow-col gap-8">
      {shipLocations.map(([location, ships]) => (
        <Fragment key={location}>
          <MarketplaceList location={location}>
            {(marketplace) =>
              marketplace.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {marketplace.map((item) => (
                    <Fragment key={item.symbol}>
                      <MarketplaceItem item={item}>
                        <div className="grid grid-cols-2 gap-4">
                          <Modal
                            action={({ openModal }) => (
                              <button onClick={openModal} className="btn bg-rose-500 font-bold">
                                BUY
                              </button>
                            )}
                          >
                            <Dialog
                              render={({ closeModal }) => (
                                <Dialog.Content>
                                  <PurchaseGoods
                                    ships={ships}
                                    marketplace={item}
                                    onDone={closeModal}
                                    onCancel={closeModal}
                                  />
                                </Dialog.Content>
                              )}
                            />
                          </Modal>
                          <button className="btn bg-emerald-500 font-bold">SELL</button>
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
