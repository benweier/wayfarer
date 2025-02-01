import type { HTMLAttributes, ReactNode } from 'react'

export type SystemTagProps = {
  type: string
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>
