import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SYSTEM_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { getShipsList, getSystemsList } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

const getPagingRange = ({ current, total, length }: { current: number; total: number; length: number }): number[] => {
  const pages = Math.min(length, total)

  let start = current - Math.floor(pages / 2)
  start = Math.max(start, 1)
  start = Math.min(start, 1 + total - length)

  return Array.from({ length: pages }, (_, i) => start + i)
}

export const ListSystems = () => {
  const [limit] = useState(24)
  const [params, setParams] = useSearchParams({ page: '1' })
  const page = parseInt(params.get('page') ?? '1')

  const systemsListQuery = useQuery({
    queryKey: ['systems', page, limit],
    queryFn: ({ signal }) => getSystemsList({ params: { page, limit } }, { signal }),
    keepPreviousData: true,
  })
  const fleetQuery = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
    select: (response) => {
      return response.data.reduce<Map<string, true>>((result, ship) => {
        result.set(ship.nav.systemSymbol, true)
        return result
      }, new Map())
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [systemsListQuery.data?.meta.page])

  useEffect(() => {
    if (systemsListQuery.data?.meta) {
      const max = Math.ceil(systemsListQuery.data?.meta.total / limit)

      if (page > max) setParams({ page: max.toString() })
    }
  }, [limit, systemsListQuery.data?.meta, page, setParams])

  if (!systemsListQuery.isSuccess) return null

  const systems = systemsListQuery.data.data
  const meta = systemsListQuery.data.meta

  return (
    <>
      <div className="relative grid gap-4">
        <div
          className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
            'pointer-events-none opacity-0': !systemsListQuery.isFetching,
            'pointer-events-auto opacity-100': systemsListQuery.isFetching,
          })}
        />
        {meta && (
          <div className="flex items-center justify-center gap-2 text-sm">
            {systemsListQuery.isFetching ? (
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
        )}
        <div className={cx('grid gap-1 md:grid-cols-2 lg:grid-cols-4')}>
          {systems.map((system) => {
            return (
              <div
                key={system.symbol}
                className={cx(
                  'flex flex-col gap-2 rounded border-2 border-transparent bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25',
                  {
                    'border-blue-500': fleetQuery.data?.has(system.symbol),
                  },
                )}
              >
                <div className="grid gap-1">
                  <div className="text-center text-lg font-black leading-none">
                    <Link className="link" to={`${ROUTES.SYSTEMS}/${system.symbol}`}>
                      {system.symbol}
                    </Link>
                  </div>
                  <div className="text-center text-xs">
                    <span className="font-medium">{SYSTEM_TYPE[system.type]}</span>{' '}
                    <span className="font-light">
                      ({system.x}, {system.y})
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {meta && (
          <div className="row grid items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-2 text-sm">
              {systemsListQuery.isFetching ? (
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
              current={meta.page}
              total={Math.ceil(meta.total / limit)}
              length={5}
              onChange={(page) => setParams({ page: page.toString() })}
            />
          </div>
        )}
      </div>
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
  length?: 3 | 5 | 7
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
        aria-label="First page"
      >
        <ChevronDoubleLeftIcon className="h-5 w-5" />
        <span className="sr-only">Page 1</span>
      </button>
      <button
        key="previous"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current > 1) onChange(current - 1)
        }}
        disabled={current <= 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Page {current - 1}</span>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={cx('btn btn-primary w-16 p-1 font-bold', { 'btn-outline': page !== current })}
          onClick={() => {
            if (current !== page) onChange(page)
          }}
          aria-label={`Page ${page}`}
          aria-current={page === current ? 'page' : undefined}
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
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Page {current + 1}</span>
      </button>
      <button
        key="last"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current < total) onChange(total)
        }}
        disabled={current >= total}
        aria-label="Last page"
      >
        <ChevronDoubleRightIcon className="h-5 w-5" />
        <span className="sr-only">Page {total}</span>
      </button>
    </div>
  )
}
