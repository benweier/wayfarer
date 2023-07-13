import { RadioGroup, Switch } from '@headlessui/react'
import { useAtom } from 'jotai'
import { marketDescriptionAtom, marketDisplayAtom } from '@/store/atoms/market.display'
import { cx } from '@/utilities/cx'

export const WaypointMarketPreferences = () => {
  const [displayMode, setDisplayMode] = useAtom(marketDisplayAtom)
  const [showDescription, setShowDescription] = useAtom(marketDescriptionAtom)

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center justify-start gap-4">
        <RadioGroup value={displayMode} onChange={setDisplayMode}>
          <RadioGroup.Label className="sr-only text-sm font-bold">Display as</RadioGroup.Label>
          <div className="flex items-center gap-2">
            {[
              { label: 'List', value: 'list' },
              { label: 'Grid', value: 'grid' },
            ].map((item) => (
              <RadioGroup.Option
                key={item.value}
                value={item.value}
                className={({ checked }) => cx('btn btn-sm', { 'btn-primary btn-outline': checked })}
              >
                <RadioGroup.Label className="text-sm font-semibold">{item.label}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center justify-end gap-4">
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
