import type { ReactNode } from 'react'
import type { HTMLAttributes } from 'types-react'

export type SystemTagProps = {
  type: string
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>
