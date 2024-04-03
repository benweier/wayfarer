import { type PropsWithChildren } from 'react'
import { type ShipLoadoutItemProps } from './ship-loadout.types'

export const ShipLoadoutItem = ({ name, description, action, children }: PropsWithChildren<ShipLoadoutItemProps>) => {
  return (
    <div className="bg-background-secondary flex flex-col justify-between gap-4 rounded py-3 px-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{name}</div>
          {action && <div>{action}</div>}
        </div>
        <div className="text-foreground-secondary typography-sm">{description}</div>
      </div>
      {children && <div className="bg-background-secondary rounded p-2">{children}</div>}
    </div>
  )
}
