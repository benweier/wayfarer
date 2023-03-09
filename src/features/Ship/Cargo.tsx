import { useAtom } from 'jotai'
import { cargoDisplayAtom } from '@/services/store/atoms/cargo.display'
import { ShipResponse } from '@/types/spacetraders'
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

export const Cargo = ({ ship }: { ship: ShipResponse }) => {
  const [cargoDisplayMode] = useAtom(cargoDisplayAtom)

  return (
    <>
      <CargoDisplayMode />
      <div
        className={cx('grid grid-cols-1 gap-2', {
          'lg:grid-cols-1': cargoDisplayMode === 'list',
          'lg:grid-cols-3': cargoDisplayMode === 'grid',
        })}
      >
        {ship.cargo.inventory.map((item) => {
          return (
            <div key={item.symbol} className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
              <div
                className={cx('flex items-center gap-4', {
                  'justify-between': cargoDisplayMode === 'grid',
                  'justify-start': cargoDisplayMode === 'list',
                })}
              >
                <span className="font-semibold">{item.name}</span>
                <span>{item.units}</span>
              </div>
              <div className="text-sm opacity-60">{item.description}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
