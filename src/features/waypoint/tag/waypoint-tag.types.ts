import type { HTMLAttributes, ReactNode } from 'react'

export type WaypointTagProps = {
  type: string
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>
