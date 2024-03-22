import { type PropsWithChildren } from 'react'
import { type ShipLoadoutItemProps } from './ship-loadout.types'

export const ShipLoadoutItem = ({ name, description, action, children }: PropsWithChildren<ShipLoadoutItemProps>) => {
  return (
    <div className="flex flex-col justify-between gap-4 rounded bg-zinc-500/10 py-3 px-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{name}</div>
          {action && <div>{action}</div>}
        </div>
        <div className="text-secondary text-sm">{description}</div>
      </div>
      {children && <div className="rounded bg-zinc-500/10 p-2">{children}</div>}
    </div>
  )
}
