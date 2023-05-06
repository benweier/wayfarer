import { RadioGroup, Switch } from '@headlessui/react'
import { useAtom } from 'jotai'
import { cargoDescriptionAtom, cargoDisplayAtom } from '@/services/store/atoms/cargo.display'
import { cx } from '@/utilities/cx'

export const Preferences = () => {
  const [cargoDisplayMode, setCargoDisplayMode] = useAtom(cargoDisplayAtom)
  const [showCargoDescription, setShowCargoDescription] = useAtom(cargoDescriptionAtom)

  return (
    <div className="flex items-center justify-between gap-4">
      <RadioGroup value={cargoDisplayMode} onChange={setCargoDisplayMode}>
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

      <div className="flex items-center gap-2">
        <span className="text-secondary text-sm">Show item description</span>
        <Switch
          checked={showCargoDescription}
          onChange={setShowCargoDescription}
          className={cx(
            'relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ',
            {
              'bg-emerald-500 dark:bg-emerald-600': showCargoDescription,
              'bg-zinc-700 dark:bg-zinc-900': !showCargoDescription,
            },
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
              {
                'translate-x-0': !showCargoDescription,
                'translate-x-6': showCargoDescription,
              },
            )}
          />
        </Switch>
      </div>
    </div>
  )
}