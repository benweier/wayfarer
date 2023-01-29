import { useQuery } from '@tanstack/react-query'
import { useSelect } from '@/components/Select'
import * as api from '@/services/api/spacetraders'
import { System } from '@/types/spacetraders'
import { SystemSelectOptions } from './types'

export const useSystemSelect = (): SystemSelectOptions => {
  const { data, isFetching } = useQuery(['systems'], api.availableSystemsQuery, { suspense: false })
  const { options, selected, onChange } = useSelect<System>(data?.systems)

  return isFetching
    ? {
        systems: [],
        isLoading: true,
        selected: undefined,
        onChange,
      }
    : {
        systems: options,
        isLoading: false,
        selected: selected ?? null,
        onChange,
      }
}
