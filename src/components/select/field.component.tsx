import { Listbox } from '@headlessui/react'
import { CheckCircleIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cx } from '@/utilities/cx'
import { SelectFieldProps } from './select.types'

export const Field = <T = string,>({
  label,
  selected,
  by,
  options = [],
  onChange,
  getItemKey,
  getItemLabel,
  getItemOption,
  getItemDisabled,
}: SelectFieldProps<T>) => {
  return (
    <Listbox value={selected} by={by} onChange={onChange} as="div" className="relative">
      {label}

      <Listbox.Button className="select">
        {({ value }) => (
          <>
            <span className="block truncate">{getItemLabel(value) ?? <>&nbsp;</>}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
            </span>
          </>
        )}
      </Listbox.Button>

      {options.length > 0 && (
        <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border-2 border-zinc-100 bg-white/90 text-sm outline-none backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
          {options.map((option) => (
            <Listbox.Option
              key={getItemKey(option)}
              value={option}
              disabled={getItemDisabled?.(option)}
              className="relative"
            >
              {({ selected, active, disabled }) => {
                return (
                  <div className="relative p-1">
                    <span
                      className={cx(
                        'relative block cursor-default select-none truncate rounded py-2 pl-3 pr-9 transition-colors duration-100 ease-in-out',
                        { 'bg-zinc-900/5 dark:bg-zinc-100/10': active, 'opacity-50': disabled },
                      )}
                    >
                      {getItemOption(option)}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-emerald-500" />
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
