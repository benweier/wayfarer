import { useCallback, useState } from 'react'
import useResizeObserver, { type ResizeHandler } from 'use-resize-observer'

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ContainerBreakpoints = Array<[BreakpointKey, number]>

export const useContainerQuery = (breakpoints: ContainerBreakpoints) => {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>()
  const onResize = useCallback<ResizeHandler>(
    ({ width }) => {
      for (const bp of breakpoints) {
        const [key, value] = bp

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
