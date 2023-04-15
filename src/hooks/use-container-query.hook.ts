import { useCallback, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ContainerBreakpoints = [BreakpointKey, number][]

export const useContainerQuery = (breakpoints: ContainerBreakpoints) => {
  const [breakpoint, setBreakpoint] = useState(undefined)

  const { ref } = useResizeObserver({
    onResize: useCallback(
      ({ width }) => {
        for (let i = 0; i < breakpoints.length; i = i + 1) {
          const [key, value] = breakpoints[i]
          if (width <= value) {
            setBreakpoint(key)
            break
          }
        }
      },
      [breakpoints],
    ),
  })

  return { ref, breakpoint }
}
