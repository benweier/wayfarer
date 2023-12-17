import { type CargoInventory, type MarketTradeGood } from '@/types/spacetraders'

export type ShipCargoTableSchema = { item: CargoInventory; trade?: MarketTradeGood }

export type ShipCargoTableProps = { data: ShipCargoTableSchema[] }
