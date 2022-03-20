import { useCallback, useMemo } from 'react'
import tw from 'twin.macro'
import { Label } from '@/components/Label'
import { SelectField } from '@/components/Select'
import { LocationSelectOptions } from './types'

export const LocationSelect = ({ locations, selected, isLoading, onChange }: LocationSelectOptions) => {
  const options = useMemo(
    () => locations.map((location) => ({ id: location.symbol, name: location.name })),
    [locations],
  )
  const value = useMemo(() => options.find((location) => location.id === selected?.symbol), [options, selected])
  const handleChange = useCallback(
    (value?: { id: string; name: string }) => {
      onChange(locations.find((location) => location.symbol === value?.id))
    },
    [locations, onChange],
  )

  if (isLoading)
    return (
      <span>
        <Label>Location</Label>
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

  return <SelectField label="Location" selected={value} options={options} onChange={handleChange} />
}
