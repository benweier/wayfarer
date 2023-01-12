import { useCallback, useMemo } from 'react'
import { Label } from '@/components/Label'
import { SelectField } from '@/components/Select'
import { SystemSelectOptions } from './types'

export const SystemSelect = ({ systems, selected, isLoading, onChange }: SystemSelectOptions) => {
  const options = useMemo(() => systems.map((system) => ({ id: system.symbol, name: system.name })), [systems])
  const value = useMemo(() => options.find((system) => system.id === selected?.symbol), [options, selected])
  const handleChange = useCallback(
    (value?: { id: string; name: string }) => {
      onChange(systems.find((system) => system.symbol === value?.id))
    },
    [systems, onChange],
  )

  if (isLoading)
    return (
      <span>
        <Label>System</Label>
        <div className="relative w-full rounded-md border-2 border-gray-500 bg-gray-700 px-4 py-2 text-sm opacity-50 shadow-inner">
          <div className="flex h-5 items-center">
            <div className="h-2 w-2/3 animate-pulse rounded-full bg-gray-500" />
          </div>
        </div>
      </span>
    )

  return <SelectField label="System" selected={value} options={options} onChange={handleChange} />
}
