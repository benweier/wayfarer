import { useCallback, useEffect, useState } from 'react'
import { SelectOption } from './types'

type UseSelectOptions<T = SelectOption> = {
  options: T[]
  selected?: T
  onChange: (value?: T) => void
}

export const useSelect = <T = SelectOption>(options: T[] = []): UseSelectOptions<T> => {
  const [selected, setSelected] = useState<T | undefined>()

  const onChange = useCallback((value?: T) => {
    setSelected(value)
  }, [])

  useEffect(() => {
    if (options.length) setSelected(options[0])
  }, [options])

  return {
    options,
    selected,
    onChange,
  }
}
