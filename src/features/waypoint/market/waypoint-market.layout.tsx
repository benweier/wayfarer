import { type WaypointMarketLayoutProps } from './waypoint-market.types'

export const WaypointMarketLayout = ({ imports, exports, exchange }: WaypointMarketLayoutProps) => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4">
        <div className="text-headline text-left">Imports</div>
        <div className="grid grid-cols-1 gap-2">{imports}</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-left">Exports</div>
        <div className="grid grid-cols-1 gap-2">{exports}</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-left">Exchange</div>
        <div className="grid grid-cols-1 gap-2">{exchange}</div>
      </div>
    </div>
  )
}
