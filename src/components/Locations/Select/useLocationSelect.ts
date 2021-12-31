import { useMemo } from 'react'
import { LocationSelectOptions } from './types'
import { useSelect } from '@/components/Select'
import { useAvailableSystemsQuery } from '@/services/spacetraders/core'
import { Location, System } from '@/types/spacetraders'

export const useLocationSelect = ({ system }: { system?: System }): LocationSelectOptions => {
  const { data, isLoading } = useAvailableSystemsQuery()
  const locations = useMemo(
    () =>
      data?.systems.reduce<Location[]>((locations, item) => {
        if (!system) return locations

        if (system.symbol === item.symbol) {
          return [...locations, ...item.locations]
        }

        return locations
      }, []),
    [data, system],
  )
  const { options, selected, onChange } = useSelect<Location>(locations)

  return isLoading
    ? {
        system: undefined,
        locations: [],
        isLoading: true,
        selected: undefined,
        onChange,
      }
    : {
        system,
        locations: options,
        isLoading: false,
        selected,
        onChange,
      }
}
