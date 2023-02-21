import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getSystemsList } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

const getPagingRange = ({ current, total, length }: { current: number; total: number; length: number }): number[] => {
  const pages = Math.min(length, total)

  let start = current - Math.floor(pages / 2)
  start = Math.max(start, 1)
  start = Math.min(start, 1 + total - length)

  return Array.from({ length: pages }, (_, i) => start + i)
}

export const ListSystems = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const { isSuccess, isFetching, data } = useQuery({
    queryKey: ['systems', page, limit],
    queryFn: ({ signal }) => getSystemsList({ params: { page, limit } }, { signal }),
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
        <div className={cx('grid gap-4')}>
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
        <div className="row grid items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            {isFetching ? (
              <div>...</div>
            ) : (
              <>
                <div>
                  {page * limit + 1 - limit} - {page * limit - limit + systems.length}
                </div>
                <div className="opacity-50">of</div>
                <div>{meta.total}</div>
              </>
            )}
          </div>
          <Pagination
            current={page}
            total={Math.ceil(meta.total / limit)}
            length={5}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
    </>
  )
}

export const Pagination = ({
  current,
  total,
  length = 5,
  onChange,
}: {
  current: number
  total: number
  length?: 3 | 5 | 10
  onChange: (page: number) => void
}) => {
  const pages = getPagingRange({ current, total, length })

  return (
    <div className="flex gap-2">
      <button
        key="first"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current > 1) onChange(1)
        }}
        disabled={current <= 1}
      >
        <ChevronDoubleLeftIcon className="h-5 w-5" />
      </button>
      <button
        key="previous"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current > 1) onChange(current - 1)
        }}
        disabled={current <= 1}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={cx('btn btn-primary w-16 p-1 font-bold', { 'btn-outline': page !== current })}
          onClick={() => {
            if (current !== page) onChange(page)
          }}
        >
          {page}
        </button>
      ))}

      <button
        key="next"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current < total) onChange(current + 1)
        }}
        disabled={current >= total}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
      <button
        key="last"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current < total) onChange(total)
        }}
        disabled={current >= total}
      >
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
