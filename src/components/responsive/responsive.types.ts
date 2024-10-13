import type { PropsWithChildren, ReactNode } from 'react'

export type ResponsiveOptions = {
  up?: boolean
  below?: boolean
  fallback?: ReactNode
}

export type ResponsiveComponentProps = PropsWithChildren<ResponsiveOptions>

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BreakpointQuery = {
  min: number
  max: number
}
