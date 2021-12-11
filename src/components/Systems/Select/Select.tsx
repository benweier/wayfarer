import { useMemo, useCallback } from 'react'
import tw from 'twin.macro'
import { Label } from '@/components/Label'
import { Select } from '@/components/Select'
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

  return <Select label="System" selected={value} options={options} onChange={handleChange} />
}
