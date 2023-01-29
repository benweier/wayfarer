import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useSelect } from '@/components/Select'
import * as api from '@/services/api/spacetraders'
import { Location, System, SystemsResponse } from '@/types/spacetraders'
import { LocationSelectOptions } from './types'

export const useLocationSelect = ({ system }: { system?: System }): LocationSelectOptions => {
  const { data, isFetching } = useQuery(['systems'], api.availableSystemsQuery, {
    select: useCallback(
      (response: SystemsResponse) => {
        return response.systems.reduce<Location[]>((locations, item) => {
          if (!system) return locations

          if (system.symbol === item.symbol) {
            return [...locations, ...item.locations]
          }

          return locations
        }, [])
      },
      [system],
    ),
  })

  const { options, selected, onChange } = useSelect(data)

  return isFetching
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
