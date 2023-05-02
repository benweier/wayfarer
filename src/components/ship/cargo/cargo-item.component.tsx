import { useAtom } from 'jotai'
import { cargoDescriptionAtom } from '@/services/store/atoms/cargo.display'
import { CargoInventory, MarketTradeGood } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

export const Item = ({ item, children }: WithChildren<{ item: CargoInventory; good?: MarketTradeGood }>) => {
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
