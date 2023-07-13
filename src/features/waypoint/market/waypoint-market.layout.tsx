import { useAtom } from 'jotai'
import { ReactNode } from 'react'
import { marketDisplayAtom } from '@/store/atoms/market.display'
import { cx } from '@/utilities/cx'

export const WaypointMarketLayout = ({
  imports,
  exports,
  exchange,
}: {
  imports: ReactNode
  exports: ReactNode
  exchange: ReactNode
}) => {
  const [displayMode] = useAtom(marketDisplayAtom)

  return (
    <div
      className={cx('grid grid-cols-1', {
        'gap-12 lg:grid-cols-1': displayMode === 'list',
        'gap-4 lg:grid-cols-3': displayMode === 'grid',
      })}
    >
      <div className="flex flex-col gap-4">
        <div className="text-headline text-left">Imports</div>
        <div className="flex flex-col gap-2">{imports}</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-left">Exports</div>
        <div className="flex flex-col gap-2">{exports}</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-left">Exchange</div>
        <div className="flex flex-col gap-2">{exchange}</div>
      </div>
    </div>
  )
}
