import { type PropsWithChildren } from 'react'

export type ResponsiveOptions = {
  up?: boolean
  below?: boolean
}

export type ResponsiveComponentProps = PropsWithChildren<ResponsiveOptions>
