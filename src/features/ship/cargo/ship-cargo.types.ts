import { type FC, type PropsWithChildren } from 'react'
import { type CargoInventory, type MarketTradeGood } from '@/types/spacetraders'

export type ShipCargoListProps = { Item?: FC<PropsWithChildren<ShipCargoItemProps>> }

export type ShipCargoItemProps = { item: CargoInventory; good?: MarketTradeGood }
