import { useCallback, useMemo } from 'react'
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
        <label className="label">Location</label>
        <div className="relative w-full rounded-md border-2 border-gray-500 bg-gray-700 px-4 py-2 text-sm opacity-50 shadow-inner">
          <div className="flex h-5 items-center">
            <div className="h-2 w-2/3 animate-pulse rounded-full bg-gray-500" />
          </div>
        </div>
      </span>
    )

  return <SelectField label="Location" selected={value} options={options} onChange={handleChange} />
}
