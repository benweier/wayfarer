import { useCallback, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import type { ResizeHandler } from 'use-resize-observer'

export const useContainerQuery = (
  { minWidth, maxWidth }: { minWidth: number; maxWidth: number },
  element?: HTMLElement | null,
) => {
  const [match, setMatch] = useState<boolean>()
  const onResize = useCallback<ResizeHandler>(
    ({ width }) => {
      if (width === undefined) {
        setMatch(undefined)
      } else {
        setMatch(width >= minWidth && width <= maxWidth)
      }
    },
    [maxWidth, minWidth],
  )
  const { ref } = useResizeObserver({ ref: element, onResize })

  return {
    ref,
    match,
  }
}
