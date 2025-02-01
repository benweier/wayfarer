import * as Select from '@radix-ui/react-select'
import type { PropsWithChildren } from 'react'

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <Select.Label className="text-sm px-2 py-2.5 pr-12 pl-8 text-foreground-tertiary uppercase">
      {children}
    </Select.Label>
  )
}
