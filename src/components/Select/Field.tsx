import { Listbox } from '@headlessui/react'
import { HiCheck, HiSelector } from 'react-icons/hi'
import { cx } from '@/utilities/cx'
import { SelectOption } from './types'

export const SelectField = <T extends SelectOption = SelectOption>({
  label,
  selected = null,
  options = [],
  onChange,
}: {
  label: string
  selected?: T | null
  options?: T[]
  onChange: (value?: T) => void
}) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <>
        <Listbox.Label as="label" className="label">
          {label}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md border-2 border-gray-500 bg-gray-700 py-2 pl-4 pr-10 text-left text-sm shadow-inner focus:border-gray-800 focus:outline-none focus:ring focus:ring-emerald-400">
            <span className="block truncate font-semibold">{selected?.name ?? <>&nbsp;</>}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector size={20} className="text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {options.length > 0 && (
            <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-emerald-400">
              {options.map((option) => (
                <Listbox.Option key={option.id} value={option} className="relative">
                  {({ selected, active }) => (
                    <>
                      <span
                        className={cx(
                          'relative m-1 block cursor-default select-none truncate rounded py-2 pl-3 pr-9 transition-colors duration-100 ease-in-out',
                          { 'bg-gray-600 bg-opacity-80': active },
                        )}
                      >
                        {option.name}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                          <HiCheck size={20} aria-hidden="true" className="text-emerald-400" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </div>
      </>
    </Listbox>
  )
}
