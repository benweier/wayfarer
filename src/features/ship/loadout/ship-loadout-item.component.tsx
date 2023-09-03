import { type ShipLoadoutItemProps } from './ship-loadout.types'

export const ShipLoadoutItem = ({ name, description }: ShipLoadoutItemProps) => {
  return (
    <div className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <span className="font-semibold">{name}</span>
      <span className="text-secondary text-sm">{description}</span>
    </div>
  )
}
