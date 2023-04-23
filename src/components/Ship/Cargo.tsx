import { RadioGroup, Switch } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { SellCargoForm } from '@/components/Market/SellCargo'
import { TradeGood } from '@/components/Market/TradeGood'
import { Modal, useModalActions, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { Actions } from '@/components/Ship'
import { updateShipCargo, updateShipInFleetCargo } from '@/components/Ship/Actions'
import { REFINE_ITEM_TYPE, TRADE_SYMBOL } from '@/config/constants'
import { MarketTradeGoodStore, useMarketTradeGoodContext } from '@/context/MarketTradeGood'
import { useShipContext } from '@/context/Ship'
import { SystemWaypointStore } from '@/context/SystemWaypoint'
import { createShipCargoSell, getMarket } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { cargoDescriptionAtom, cargoDisplayAtom } from '@/services/store/atoms/cargo.display'
import { useAuthStore } from '@/services/store/auth'
import { CargoInventory, MarketTradeGood, ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

export const CargoDisplayMode = () => {
  const [cargoDisplayMode, setCargoDisplayMode] = useAtom(cargoDisplayAtom)
  const [showCargoDescription, setShowCargoDescription] = useAtom(cargoDescriptionAtom)

  return (
    <div className="flex items-center justify-between gap-4">
      <RadioGroup value={cargoDisplayMode} onChange={setCargoDisplayMode}>
        <RadioGroup.Label className="sr-only text-sm font-bold">Display as</RadioGroup.Label>
        <div className="flex items-center gap-2">
          {[
            { label: 'List', value: 'list' },
            { label: 'Grid', value: 'grid' },
          ].map((item) => (
            <RadioGroup.Option
              key={item.value}
              value={item.value}
              className={({ checked }) => cx('btn btn-sm', { 'btn-primary btn-outline': checked })}
            >
              <RadioGroup.Label className="text-sm font-semibold">{item.label}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <div className="flex items-center gap-2">
        <span className="text-secondary text-sm">Show item description</span>
        <Switch
          checked={showCargoDescription}
          onChange={setShowCargoDescription}
          className={cx(
            'relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ',
            {
              'bg-emerald-500 dark:bg-emerald-600': showCargoDescription,
              'bg-zinc-700 dark:bg-zinc-900': !showCargoDescription,
            },
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
              {
                'translate-x-0': !showCargoDescription,
                'translate-x-6': showCargoDescription,
              },
            )}
          />
        </Switch>
      </div>
    </div>
  )
}

const SellCargo = () => {
  const { ref, modal } = useModalImperativeHandle()
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const ship = useShipContext((state) => state)
  const good = useMarketTradeGoodContext((state) => state)
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
  const ship = useShipContext((state) => state)

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
          <Actions.Jettison
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

const CargoItem = ({ item, children }: WithChildren<{ item: CargoInventory; good?: MarketTradeGood }>) => {
  const [cargoDescription] = useAtom(cargoDescriptionAtom)

  return (
    <div className="flex flex-col justify-between gap-8 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 @container dark:bg-opacity-10">
      <div className="grid gap-2">
        <div className={cx('flex items-center justify-between gap-4 @[600px]:justify-start')}>
          <span className="font-medium">{item.name}</span>
          <span className="text-lg font-bold">{item.units}</span>
        </div>
        {cargoDescription && <div className="text-secondary text-sm">{item.description}</div>}
      </div>
      {children}
    </div>
  )
}

export const Cargo = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="grid gap-4">
      <div>
        <CargoDisplayMode />
      </div>

      <QuerySuspenseBoundary>
        <CargoList ship={ship} />
      </QuerySuspenseBoundary>
    </div>
  )
}

export const CargoList = ({ ship }: { ship: ShipResponse }) => {
  const [cargoDisplayMode] = useAtom(cargoDisplayAtom)
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
    <div
      className={cx('grid grid-cols-1 gap-2', {
        'lg:grid-cols-1': cargoDisplayMode === 'list',
        'lg:grid-cols-3': cargoDisplayMode === 'grid',
      })}
    >
      {ship.cargo.inventory.map((item) => {
        const produce = REFINE_ITEM_TYPE.get(item.symbol)
        const good = data?.market.has(item.symbol) ? data.goods?.get(item.symbol) : undefined

        return (
          <Fragment key={item.symbol}>
            <CargoItem item={item}>
              <div className={cx('flex flex-wrap justify-end gap-x-2 gap-y-1 @[600px]:justify-start')}>
                {produce && <Actions.Refine ship={ship} produce={produce} />}
                {!good ? (
                  <button disabled className="btn btn-confirm btn-flat btn-sm grayscale-50">
                    Sell
                  </button>
                ) : (
                  <SystemWaypointStore systemID={ship.nav.systemSymbol} waypointID={ship.nav.waypointSymbol}>
                    <MarketTradeGoodStore good={good}>
                      <SellCargo />
                    </MarketTradeGoodStore>
                  </SystemWaypointStore>
                )}
                <JettisonCargo item={item} />
              </div>
            </CargoItem>
          </Fragment>
        )
      })}
    </div>
  )
}
