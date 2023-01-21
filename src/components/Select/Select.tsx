import { useCallback, useMemo } from 'react'
import { SelectField } from './Field'
import { SelectOption, SelectProps } from './types'

type SelectItem = unknown

export const SelectSkeleton = ({ label }: { label: string }) => (
  <span>
    <label className="label">{label}</label>
    <div className="relative w-full rounded-md border-2 border-gray-500 bg-gray-700 px-4 py-2 text-sm opacity-50 shadow-inner">
      <div className="flex h-5 items-center">
        <div className="h-2 w-2/3 animate-pulse rounded-full bg-gray-500" />
      </div>
    </div>
  </span>
)

export const Select = <T extends SelectItem>({
  label,
  data,
  selected,
  loading,
  onChange,
  getOption,
  getItemKey,
}: SelectProps<T>) => {
  const options = useMemo(() => data.map(getOption), [data, getOption])
  const value = useMemo(
    () =>
      data.reduce<SelectOption | undefined>((result, item, index, source) => {
        if (getItemKey(item) === getItemKey(selected)) {
          return getOption(item, index, source)
        }

        return result
      }, undefined),
    [data, selected, getItemKey, getOption],
  )
  const handleChange = useCallback(
    (value?: SelectOption) => {
      onChange(data.find((item) => getItemKey(item) === value?.id))
    },
    [data, onChange, getItemKey],
  )

  return loading ?? <SelectField label={label} selected={value} options={options} onChange={handleChange} />
}
