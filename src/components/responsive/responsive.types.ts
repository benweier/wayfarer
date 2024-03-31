import { type PropsWithChildren, type ReactNode } from 'react'

export type ResponsiveOptions = {
  up?: boolean
  below?: boolean
  fallback?: ReactNode
}

export type ResponsiveComponentProps = PropsWithChildren<ResponsiveOptions>
