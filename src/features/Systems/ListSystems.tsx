import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getSystemsList } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

const getPagingRange = ({
  current,
  min,
  total,
  length,
}: {
  current: number
  min: number
  total: number
  length: number
}): number[] => {
  const pages = Math.min(length, total)

  let start = current - Math.floor(pages / 2)
  start = Math.max(start, min)
  start = Math.min(start, min + total - length)

  return Array.from({ length: pages }, (_, i) => start + i)
}

export const ListSystems = () => {
  const [page, setPage] = useState(1)
  const { isSuccess, isFetching, data } = useQuery({
    queryKey: ['systems', page],
    queryFn: ({ signal }) => getSystemsList({ params: { page } }, { signal }),
    keepPreviousData: true,
  })

  if (!isSuccess) return null

  const systems = data.data
  const meta = data?.meta

  return (
    <>
      <div className="relative">
        <div
          className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
            'pointer-events-none opacity-0': !isFetching,
            'pointer-events-auto opacity-100': isFetching,
          })}
        />
        <div className={cx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3')}>
          {systems.map((system) => {
            return (
              <div key={system.symbol} className="bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25">
                <Link to={`${ROUTES.SYSTEMS}/${system.symbol}`}>{system.symbol}</Link>
              </div>
            )
          })}
        </div>
      </div>
      {meta && (
        <div>
          <Pagination current={page} total={meta.total} length={10} onChange={(page) => setPage(page)}></Pagination>
        </div>
      )}
    </>
  )
}

export const Pagination = ({
  current,
  total,
  min = 1,
  length = 5,
  onChange,
}: {
  current: number
  min?: number
  total: number
  length?: number
  onChange: (page: number) => void
}) => {
  const pages = getPagingRange({ current, min, total, length })

  return (
    <div className="grid grid-flow-col gap-2">
      {pages.map((page) => (
        <button
          key={page}
          className={cx('btn btn-primary', { 'btn-outline': page !== current })}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
