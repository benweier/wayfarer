import { useMemo, useCallback } from 'react'
import tw from 'twin.macro'
import { Label } from 'components/Label'
import { Select } from 'components/Select'
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
            tw`text-sm bg-gray-700 relative w-full border-2 border-gray-500 shadow-inner rounded-md pl-4 pr-10 py-2`,
            tw`focus:(ring ring-emerald-400 outline-none border-gray-800)`,
          ]}
        >
          <span css={tw`block`}>&nbsp;</span>
          <span css={tw`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none`}>
            <svg
              css={tw`animate-spin h-5 w-5 text-gray-300`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle css={tw`opacity-25`} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                css={tw`opacity-75`}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        </div>
      </span>
    )

  return <Select label="System" selected={value} options={options} onChange={handleChange} />
}
