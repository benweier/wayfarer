import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppIcon } from '@/components/icons'
import { SellCargo } from '@/components/market/sell-cargo'
import { Modal, useModalActions } from '@/components/modal'
import { REFINE_ITEM_TYPE, SHIP_MOUNT_TYPE } from '@/config/constants'
import { useShipResponse } from '@/context/ship.context'
import { SystemContext } from '@/context/system.context'
import { WaypointContext, useWaypointResponse } from '@/context/waypoint.context'
import * as ShipActions from '@/features/ship/actions'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type CargoInventory, type MarketTradeGood } from '@/types/spacetraders'
import { ShipCargoItem } from './ship-cargo-item.component'
import { ShipCargoLayout } from './ship-cargo.layout'
import { type ShipCargoListProps } from './ship-cargo.types'

const JettisonCargo = ({ item }: { item: CargoInventory }) => {
  const ship = useShipResponse()

  return (
    <Modal
      trigger={
        <Modal.Trigger>
          {(props) => (
            <button className="btn btn-flat btn-danger btn-sm" {...props}>
              Jettison
            </button>
          )}
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
          <ShipActions.Jettison ship={ship} symbol={item.symbol} units={item.units}>
            {(props) => (
              <button className="btn btn-danger flex w-full items-center gap-3" {...props}>
                <AppIcon id="trash" className="h-5 w-5" />
                <span>Confirm Jettison</span>
              </button>
            )}
          </ShipActions.Jettison>
        </div>
      </div>
    </Modal>
  )
}
const CancelModal = () => {
  const { closeModal } = useModalActions()

  return (
    <button
      className="btn"
      onClick={() => {
        closeModal()
      }}
    >
      Cancel
    </button>
  )
}

export const ShipCargoList = ({ Item = ShipCargoItem }: ShipCargoListProps) => {
  const navigate = useNavigate()
  const ship = useShipResponse()
  const waypoint = useWaypointResponse()
  const hasMarketplace = waypoint.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1
  const { data } = useQuery({
    queryKey: getWaypointMarketQuery.getQueryKey({
      systemSymbol: ship.nav.systemSymbol,
      waypointSymbol: ship.nav.waypointSymbol,
    }),
    queryFn: getWaypointMarketQuery.queryFn,
    select: (response) => {
      const market = [...response.data.imports, ...response.data.exports, ...response.data.exchange]
      const goods = response.data.tradeGoods?.reduce<Map<string, MarketTradeGood>>((result, item) => {
        result.set(item.symbol, item)

        return result
      }, new Map())

      return {
        market: new Map(market.map((item) => [item.symbol, item])),
        goods,
      }
    },
    enabled: hasMarketplace,
  })
  const inventory = ship.cargo.inventory

  if (!inventory.length) {
    return (
      <div className="flex flex-col gap-2 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="text-secondary text-center text-sm">
          <span className="font-bold">{ship.symbol}</span> has no cargo
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
            disabled={!hasMarketplace}
            onClick={() => {
              navigate(`/fleet/ship/${ship.symbol}/market`)
            }}
          >
            {hasMarketplace ? `View Market at ${ship.nav.waypointSymbol}` : `No Market at ${ship.nav.waypointSymbol}`}
          </button>
        </div>
      </div>
    )
  }

  return (
    <ShipCargoLayout>
      {inventory.map((item) => {
        const mount = SHIP_MOUNT_TYPE.has(item.symbol)
        const produce = REFINE_ITEM_TYPE.get(item.symbol)
        const good = data?.goods?.get(item.symbol)

        return (
          <Fragment key={item.symbol}>
            <Item item={item}>
              <div className="flex flex-wrap justify-end gap-x-2 gap-y-1 @[600px]:justify-start">
                {mount && (
                  <ShipActions.InstallMount ship={ship} mountSymbol={item.symbol}>
                    {(props) => (
                      <button className="btn btn-primary btn-sm" {...props}>
                        Install
                      </button>
                    )}
                  </ShipActions.InstallMount>
                )}
                {produce && <ShipActions.Refine ship={ship} produce={produce} />}
                {good !== undefined && (
                  <SystemContext.Provider value={{ systemSymbol: ship.nav.systemSymbol }}>
                    <WaypointContext.Provider value={{ waypointSymbol: ship.nav.waypointSymbol }}>
                      <SellCargo
                        good={good}
                        action={(props) => (
                          <button className="btn btn-confirm btn-flat btn-sm" {...props}>
                            Sell {`(${good.sellPrice})`}
                          </button>
                        )}
                      />
                    </WaypointContext.Provider>
                  </SystemContext.Provider>
                )}
                <JettisonCargo item={item} />
              </div>
            </Item>
          </Fragment>
        )
      })}
    </ShipCargoLayout>
  )
}
