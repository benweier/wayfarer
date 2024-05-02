import type { ShipResponse } from '@/types/spacetraders'

export const ShipSelection = ({ ship }: { ship: ShipResponse }) => <div className="font-bold">{ship.symbol}</div>

export const ShipOption = ({ ship }: { ship: ShipResponse }) => (
  <div className="typography-sm font-bold">{ship.symbol}</div>
)
