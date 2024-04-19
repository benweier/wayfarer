import type { FC, PropsWithChildren, ReactNode } from 'react'

export type ShipLoadoutListProps = {
  Item?: FC<PropsWithChildren<ShipLoadoutItemProps>>
}

export type ShipLoadoutItemProps = {
  name: string
  description: string
  action?: ReactNode
}
