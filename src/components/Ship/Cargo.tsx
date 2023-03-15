import { offset, shift, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useAtom } from 'jotai'
import { Fragment, useRef } from 'react'
import { Modal } from '@/components/Modal'
import { Actions } from '@/components/Ship'
import { REFINE_ITEM_TYPE } from '@/config/constants'
import { useShipContext } from '@/context/Ship'
import { cargoDisplayAtom } from '@/services/store/atoms/cargo.display'
import { CargoInventory, ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

export const CargoDisplayMode = () => {
  const [cargoDisplayMode, setCargoDisplayMode] = useAtom(cargoDisplayAtom)

  return (
    <div className="flex flex-row gap-2">
      <button
        className={cx('btn btn-sm', { 'btn-primary btn-outline': cargoDisplayMode === 'list' })}
        onClick={() => setCargoDisplayMode('list')}
      >
        List
      </button>
      <button
        className={cx('btn btn-sm', { 'btn-primary btn-outline': cargoDisplayMode === 'grid' })}
        onClick={() => setCargoDisplayMode('grid')}
      >
        Grid
      </button>
    </div>
  )
}

const Manage = ({ children }: WithChildren) => {
  const [cargoDisplayMode] = useAtom(cargoDisplayAtom)
  const { x, y, refs } = useFloating<HTMLButtonElement>({
    strategy: 'absolute',
    placement: cargoDisplayMode === 'list' ? 'top-start' : 'top-end',
    middleware: [offset(8), shift({ padding: 4 })],
  })

  return (
    <Menu as="div" className="relative">
      <Menu.Button ref={refs.setReference} className="btn btn-icon ui-open:bg-black/5 ui-open:dark:bg-white/5">
        <span className="sr-only">Manage</span>
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <div
        ref={refs.setFloating}
        className={cx('absolute bottom-full', {
          'left-0': cargoDisplayMode === 'list',
          'right-0': cargoDisplayMode === 'grid',
          'pointer-events-none': !open,
        })}
        style={{
          transform:
            typeof x === 'number' && typeof y === 'number'
              ? `translate(${Math.round(x)}px,${Math.round(y)}px)`
              : undefined,
        }}
      >
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="relative flex w-52 flex-col gap-1 rounded-md bg-zinc-100/75 p-1 backdrop-blur-lg dark:bg-zinc-800/75">
            {children}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
}

const CargoItem = ({ item }: { item: CargoInventory }) => {
  const ship = useShipContext((state) => state)
  const [cargoDisplayMode] = useAtom(cargoDisplayAtom)
  const ref = useRef<{ openModal: () => void; closeModal: () => void }>()

  return (
    <div
      key={item.symbol}
      className="flex flex-col justify-between gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10"
    >
      <div className="grid gap-2">
        <div
          className={cx('flex items-center gap-4', {
            'justify-between': cargoDisplayMode === 'grid',
            'justify-between lg:justify-start': cargoDisplayMode === 'list',
          })}
        >
          <span className="font-medium">{item.name}</span>
          <span className="text-lg font-bold">{item.units}</span>
        </div>
        <div className="text-secondary text-sm">{item.description}</div>
      </div>
      <div
        className={cx('flex gap-2', {
          'justify-end': cargoDisplayMode === 'grid',
          'justify-end lg:justify-start': cargoDisplayMode === 'list',
        })}
      >
        {!!REFINE_ITEM_TYPE[item.symbol] && <Actions.Refine ship={ship} produce={REFINE_ITEM_TYPE[item.symbol]} />}
        <Manage>
          <Menu.Item>
            <button
              className="btn btn-flat btn-danger flex w-full items-center gap-3"
              onClick={() => ref.current?.openModal()}
            >
              <TrashIcon className="h-4 w-4" />
              <span>Jettison</span>
            </button>
          </Menu.Item>
        </Manage>
        <Modal ref={ref}>
          <div className="grid gap-8">
            <div className="text-title">Are you sure?</div>
            <div>
              Destroy {item.name} x{item.units}
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={() => ref.current?.closeModal()}>
                Cancel
              </button>
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
      </div>
    </div>
  )
}

export const Cargo = ({ ship }: { ship: ShipResponse }) => {
  const [cargoDisplayMode] = useAtom(cargoDisplayAtom)

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <CargoDisplayMode />
      </div>

      <div
        className={cx('grid grid-cols-1 gap-2', {
          'lg:grid-cols-1': cargoDisplayMode === 'list',
          'lg:grid-cols-3': cargoDisplayMode === 'grid',
        })}
      >
        {ship.cargo.inventory.map((item) => {
          return <CargoItem key={item.symbol} item={item} />
        })}
      </div>
    </div>
  )
}
