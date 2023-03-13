import { Listbox } from '@headlessui/react'
import { CheckCircleIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cx } from '@/utilities/cx'
import { SelectOption } from './types'

export const SelectField = <T extends SelectOption = SelectOption>({
  label,
  selected = null,
  options = [],
  onChange,
}: {
  label?: string
  selected?: T | null
  options?: T[]
  onChange: (value?: T) => void
}) => {
  return (
    <Listbox value={selected} by={(a, b) => a?.id === b?.id} onChange={onChange} as="div" className="relative">
      {label && (
        <Listbox.Label as="label" className="label">
          {label}
        </Listbox.Label>
      )}

      <Listbox.Button className="select">
        <span className="block truncate">{selected?.name ?? <>&nbsp;</>}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
        </span>
      </Listbox.Button>

      {options.length > 0 && (
        <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border-2 border-zinc-100 bg-white/90 text-sm outline-none backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
          {options.map((option) => (
            <Listbox.Option key={option.id} value={option} className="relative">
              {({ selected, active }) => {
                return (
                  <div className="relative p-1">
                    <span
                      className={cx(
                        'relative block cursor-default select-none truncate rounded py-2 pl-3 pr-9 transition-colors duration-100 ease-in-out',
                        { 'bg-zinc-900/5 dark:bg-zinc-100/10': active },
                      )}
                    >
                      {option.name}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <CheckCircleIcon aria-hidden="true" className="h-4 w-4 text-emerald-500" />
                      </span>
                    ) : null}
                  </div>
                )
              }}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  )
}
