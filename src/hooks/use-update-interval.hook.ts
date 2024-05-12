import { startTransition, useEffect, useState } from 'react'

export const useUpdateInterval = (cb: () => boolean, interval: number) => {
  const [lastUpdate, forceUpdate] = useState<number | null>(() => Date.now())

  useEffect(() => {
    if (lastUpdate === null) return

    if (!cb()) return

    const timeout = setTimeout(() => {
      startTransition(() => {
        forceUpdate(Date.now())
      })
    }, interval)

    return () => {
      clearTimeout(timeout)
    }
  }, [lastUpdate, cb, interval])

  return null
}
