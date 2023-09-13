import { type FC, type PropsWithChildren } from 'react'

export type ShipLoadoutListProps = {
  Item?: FC<PropsWithChildren<ShipLoadoutItemProps>>
}

export type ShipLoadoutItemProps = {
  name: string
  description: string
}
