import { TrashIcon } from '@heroicons/react/20/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import { TradeGood } from '@/components/market'
import { SellCargoForm } from '@/components/market/sell-cargo.component'
import { Modal, useModalActions, useModalImperativeHandle } from '@/components/modal'
import { REFINE_ITEM_TYPE, TRADE_SYMBOL } from '@/config/constants'
import { MarketTradeGoodContext, useMarketTradeGoodContext } from '@/context/market-trade-good.context'
import { useShipContext } from '@/context/ship.context'
import { SystemContext } from '@/context/system.context'
import { WaypointContext } from '@/context/waypoint.context'
import { createShipCargoSell, getMarket } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { CargoInventory, MarketTradeGood, ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { Jettison, Refine, updateShipCargo, updateShipInFleetCargo } from '../actions.component'
import { Item } from './cargo-item.component'
import { Layout } from './cargo.layout'

const SellCargo = () => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const ship = useShipContext()
  const good = useMarketTradeGoodContext()
  const { mutateAsync } = useMutation({
    mutationKey: ['cargo', good.symbol, 'sell'],
    mutationFn: ({ shipID, item, quantity }: { shipID: string; item: string; quantity: number }) =>
      createShipCargoSell({ path: shipID, payload: { symbol: item, units: quantity } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))

      if (response.data.agent) {
        setAgent(response.data.agent)
      }
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })

      modal.close()
    },
  })

  return (
    <Modal
      ref={ref}
      trigger={
        <Modal.Trigger>
          <button className="btn btn-confirm btn-flat btn-sm">Sell {!!good && `(${good.sellPrice})`}</button>
        </Modal.Trigger>
      }
    >
      <div className="grid gap-8">
        <div className="text-title">
          Sell: <span className="font-light">{TRADE_SYMBOL.get(good.symbol) ?? good.symbol}</span>
        </div>

        <TradeGood price={good.sellPrice} volume={good.tradeVolume} supply={good.supply} />

        <SellCargoForm
          ship={ship}
          onSubmit={(values) =>
            mutateAsync({
              shipID: values.ship,
              item: values.item,
              quantity: values.quantity,
            })
          }
        />
      </div>
    </Modal>
  )
}

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
          <Jettison
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
              <div className={cx('flex flex-wrap justify-end gap-x-2 gap-y-1 @[600px]:justify-start')}>
                {produce && <Refine ship={ship} produce={produce} />}
                {!good ? (
                  <button disabled className="btn btn-confirm btn-flat btn-sm grayscale-50">
                    Sell
                  </button>
                ) : (
                  <SystemContext.Provider value={{ systemID: ship.nav.systemSymbol }}>
                    <WaypointContext.Provider value={{ waypointID: ship.nav.waypointSymbol }}>
                      <MarketTradeGoodContext.Provider value={good}>
                        <SellCargo />
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
