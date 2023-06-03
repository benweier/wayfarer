import { TrashIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { SellCargo } from '@/components/market'
import { Modal, useModalActions } from '@/components/modal'
import { REFINE_ITEM_TYPE } from '@/config/constants'
import { MarketTradeGoodContext } from '@/context/market-trade-good.context'
import { useShipContext } from '@/context/ship.context'
import { SystemContext } from '@/context/system.context'
import { WaypointContext } from '@/context/waypoint.context'
import * as ShipActions from '@/features/ship/actions'
import { getMarket } from '@/services/api/spacetraders'
import { CargoInventory, MarketTradeGood } from '@/types/spacetraders'
import { Item } from './cargo-item.component'
import { Layout } from './cargo.layout'

const JettisonCargo = ({ item }: { item: CargoInventory }) => {
  const ship = useShipContext()

  return (
    <Modal
      trigger={
        <Modal.Trigger>
          <button className="btn btn-danger btn-flat btn-sm">Jettison</button>
        </Modal.Trigger>
      }
    >
      <div className="grid gap-8">
        <div className="text-title">Are you sure?</div>
        <div>
          Destroy {item.name} x{item.units}
        </div>
        <div className="flex gap-2">
          <CancelModal />
          <ShipActions.Jettison
            ship={ship}
            symbol={item.symbol}
            units={item.units}
            trigger={
              <button className="btn btn-danger flex w-full items-center gap-3">
                <TrashIcon className="h-5 w-5" />
                <span>Confirm Jettison</span>
              </button>
            }
          />
        </div>
      </div>
    </Modal>
  )
}

const CancelModal = () => {
  const { closeModal } = useModalActions()

  return (
    <button className="btn" onClick={() => closeModal()}>
      Cancel
    </button>
  )
}

export const List = () => {
  const ship = useShipContext()
  const { data } = useQuery({
    queryKey: ['system', ship.nav.systemSymbol, ship.nav.waypointSymbol, 'market'],
    queryFn: ({ signal }) =>
      getMarket({ path: { system: ship.nav.systemSymbol, waypoint: ship.nav.waypointSymbol } }, { signal }),
    select: (response) => {
      const market = [...response.data.imports, ...response.data.exchange]
      const goods = response.data.tradeGoods?.reduce<Map<string, MarketTradeGood>>((result, item) => {
        result.set(item.symbol, item)
        return result
      }, new Map())

      return {
        market: new Map(market.map((item) => [item.symbol, item])),
        goods,
      }
    },
  })

  return (
    <Layout>
      {ship.cargo.inventory.map((item) => {
        const produce = REFINE_ITEM_TYPE.get(item.symbol)
        const good = data?.market.has(item.symbol) ? data.goods?.get(item.symbol) : undefined

        return (
          <Fragment key={item.symbol}>
            <Item item={item}>
              <div className="flex flex-wrap justify-end gap-x-2 gap-y-1 @[600px]:justify-start">
                {produce && <ShipActions.Refine ship={ship} produce={produce} />}
                {!good ? (
                  <button disabled className="btn btn-confirm btn-flat btn-sm">
                    Sell
                  </button>
                ) : (
                  <SystemContext.Provider value={{ systemID: ship.nav.systemSymbol }}>
                    <WaypointContext.Provider value={{ waypointID: ship.nav.waypointSymbol }}>
                      <MarketTradeGoodContext.Provider value={good}>
                        <SellCargo
                          action={
                            <button className="btn btn-confirm btn-flat btn-sm">
                              Sell {!!good && `(${good.sellPrice})`}
                            </button>
                          }
                        />
                      </MarketTradeGoodContext.Provider>
                    </WaypointContext.Provider>
                  </SystemContext.Provider>
                )}
                <JettisonCargo item={item} />
              </div>
            </Item>
          </Fragment>
        )
      })}
    </Layout>
  )
}
