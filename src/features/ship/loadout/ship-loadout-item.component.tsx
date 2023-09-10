import { type PropsWithChildren } from 'react'
import { type ShipLoadoutItemProps } from './ship-loadout.types'

export const ShipLoadoutItem = ({ name, description, children }: PropsWithChildren<ShipLoadoutItemProps>) => {
  return (
    <div className="flex flex-col justify-between gap-4 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <div className="space-y-1">
        <div className="font-semibold">{name}</div>
        <div className="text-secondary text-sm">{description}</div>
      </div>
      {children && <div className="rounded bg-zinc-500 bg-opacity-5 p-2 dark:bg-opacity-10">{children}</div>}
    </div>
  )
}
