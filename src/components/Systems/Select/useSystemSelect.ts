import { useSelect } from 'components/Select/useSelect'
import { useAvailableSystemsQuery } from 'services/spacetraders/core'
import { System } from 'types/spacetraders'
import { SystemSelectOptions } from './types'

export const useSystemSelect = (): SystemSelectOptions => {
  const { data, isLoading } = useAvailableSystemsQuery()
  const { options, selected, onChange } = useSelect<System>(data?.systems)

  return isLoading
    ? {
        systems: [],
        isLoading: true,
        selected: undefined,
        onChange,
      }
    : {
        systems: options,
        isLoading: false,
        selected,
        onChange,
      }
}
