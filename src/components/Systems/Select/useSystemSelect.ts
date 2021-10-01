import { useState, useEffect, useCallback } from 'react'
import { useAvailableSystemsQuery } from 'services/spacetraders/core'
import { System } from 'types/spacetraders'
import { SystemSelectOptions } from './types'

export const useSystemSelect = (): SystemSelectOptions => {
  const { data, isLoading } = useAvailableSystemsQuery()
  const [selected, setSelected] = useState<System | undefined>()

  const onChange = useCallback(
    (value?: System) => {
      setSelected(data?.systems.find((system) => system.symbol === value?.symbol))
    },
    [data],
  )

  useEffect(() => {
    if (data?.systems.length) setSelected(data.systems[0])
  }, [data?.systems])

  return isLoading
    ? {
        systems: [],
        isLoading: true,
        selected: undefined,
        onChange,
      }
    : {
        systems: data?.systems ?? [],
        isLoading: false,
        selected,
        onChange,
      }
}
