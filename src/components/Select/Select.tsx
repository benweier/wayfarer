import { useCallback, useMemo } from 'react'
import tw from 'twin.macro'
import { Label } from '@/components/Label'
import { SelectField } from './Field'
import { SelectOption, SelectProps } from './types'

type SelectItem = unknown

export const SelectSkeleton = ({ label }: { label: string }) => (
  <span>
    <Label>{label}</Label>
    <div
      css={[
        tw`text-sm bg-gray-700 relative w-full border-2 border-gray-500 shadow-inner rounded-md px-4 py-2 opacity-50`,
      ]}
    >
      <div css={tw`flex items-center h-5`}>
        <div css={tw`animate-pulse rounded-full bg-gray-500 w-2/3 h-2`} />
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
