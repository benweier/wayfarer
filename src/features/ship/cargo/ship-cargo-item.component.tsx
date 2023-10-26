import { cx } from 'class-variance-authority'
import { useAtom } from 'jotai'
import { type PropsWithChildren } from 'react'
import { cargoDescriptionAtom } from '@/store/atoms/cargo.display'
import { type ShipCargoItemProps } from './ship-cargo.types'

export const ShipCargoItem = ({ item, children }: PropsWithChildren<ShipCargoItemProps>) => {
  const [cargoDescription] = useAtom(cargoDescriptionAtom)

  return (
    <div className="flex flex-col justify-between gap-8 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 @container/cargo-item dark:bg-opacity-10">
      <div className="grid gap-2">
        <div className={cx('flex items-center justify-between gap-4 @[600px]/cargo-item:justify-start')}>
          <span className="font-medium">{item.name}</span>
          <span className="text-lg font-bold">{item.units}</span>
        </div>
        {cargoDescription && <div className="text-secondary text-sm">{item.description}</div>}
      </div>
      {children}
    </div>
  )
}
