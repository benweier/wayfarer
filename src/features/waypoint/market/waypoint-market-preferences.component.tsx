import { RadioGroup, Switch } from '@headlessui/react'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { startTransition, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSystemContext } from '@/context/system.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'
import { marketDescriptionAtom } from '@/store/atoms/market.display'
import { cx } from '@/utilities/cx'
import { relativeDate } from '@/utilities/date'

const WaypointMarketSortBy = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const value = searchParams.get('sort') ?? 'name'

  return (
    <RadioGroup
      value={value}
      onChange={(value) => {
        setSearchParams({ sort: value }, { replace: true })
      }}
      className="flex flex-col gap-1"
    >
      <RadioGroup.Label className="text-xs font-bold">Sort By</RadioGroup.Label>
      <div className="flex gap-2">
        {[
          { label: 'Item Name', value: 'name' },
          { label: 'Buy Price', value: 'buy' },
          { label: 'Sell Price', value: 'sell' },
          { label: 'Trade Volume', value: 'volume' },
        ].map((item) => (
          <RadioGroup.Option
            key={item.value}
            value={item.value}
            className={({ checked }) => cx('btn btn-sm', { 'btn-primary btn-outline': checked })}
          >
            <RadioGroup.Label>{item.label}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

const WaypointMarketRefresh = () => {
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const client = useQueryClient()
  const { systemSymbol } = useSystemContext()
  const { waypointSymbol } = useWaypointContext()
  const isFetching =
    useIsFetching({ queryKey: getWaypointMarketQuery.getQueryKey({ systemSymbol, waypointSymbol }) }) > 0
  const state = client.getQueryState(getWaypointMarketQuery.getQueryKey({ systemSymbol, waypointSymbol }))

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => {
        forceUpdate(Date.now())
      })
    }, 10_000)

    return () => {
      clearTimeout(timeout)
    }
  }, [lastUpdate, state?.dataUpdatedAt])

  return (
    <div className="flex items-center gap-2">
      <div className="text-secondary text-right text-sm">
        {isFetching ? '...' : `Last fetched ${relativeDate(state?.dataUpdatedAt)}`}
      </div>
      <button
        className="btn btn-outline btn-warn btn-sm"
        disabled={isFetching}
        onClick={() =>
          client.resetQueries({ queryKey: getWaypointMarketQuery.getQueryKey({ systemSymbol, waypointSymbol }) })
        }
      >
        Refresh
      </button>
    </div>
  )
}

export const WaypointMarketPreferences = () => {
  const [showDescription, setShowDescription] = useAtom(marketDescriptionAtom)

  return (
    <div className="flex items-center justify-between gap-4">
      <WaypointMarketSortBy />

      <div className="flex items-center justify-end gap-4">
        <WaypointMarketRefresh />
        <div className="flex items-center gap-2">
          <span className="text-secondary text-sm">Show item description</span>
          <Switch
            checked={showDescription}
            onChange={setShowDescription}
            className={cx(
              'relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ',
              {
                'bg-emerald-500 dark:bg-emerald-600': showDescription,
                'bg-zinc-700 dark:bg-zinc-900': !showDescription,
              },
            )}
          >
            <span
              aria-hidden="true"
              className={cx(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                {
                  'translate-x-0': !showDescription,
                  'translate-x-6': showDescription,
                },
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  )
}
