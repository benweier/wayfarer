import { Listbox } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { AppIcon } from '../icons'
import { type SelectFieldProps } from './select.types'

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
              <AppIcon id="chevron:up-down" className="size-4 text-zinc-400" aria-hidden="true" />
            </span>
          </>
        )}
      </Listbox.Button>

      {options.length > 0 && (
        <Listbox.Options className="border-border-primary bg-background-primary/90 typography-sm absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border-2 outline-none backdrop-blur-md">
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
                        'relative block cursor-default truncate rounded py-2 pr-9 pl-3 transition-colors duration-100 ease-in-out select-none',
                        { 'bg-background-tertiary': active, 'opacity-50': disabled },
                      )}
                    >
                      {getItemOption(option)}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <AppIcon id="check" aria-hidden="true" className="size-5 text-emerald-500" />
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
