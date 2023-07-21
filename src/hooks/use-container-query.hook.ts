import { useCallback, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import { type ResizeHandler } from 'use-resize-observer'

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ContainerBreakpoints = Array<[BreakpointKey, number]>

export const useContainerQuery = (breakpoints: ContainerBreakpoints) => {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey | undefined>(undefined)

  const onResize = useCallback<ResizeHandler>(
    ({ width }) => {
      for (let i = 0; i < breakpoints.length; i = i + 1) {
        const [key, value] = breakpoints[i]
        if (width !== undefined && width <= value) {
          setBreakpoint(key)
          break
        }
      }
    },
    [breakpoints],
  )

  const { ref } = useResizeObserver({ onResize })

  return { ref, breakpoint }
}
