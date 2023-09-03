import { type FC } from 'react'

export type ShipLoadoutListProps = {
  Item?: FC<ShipLoadoutItemProps>
}

export type ShipLoadoutItemProps = {
  name: string
  description: string
}
