import * as Select from '@radix-ui/react-select'
import { type PropsWithChildren } from 'react'

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <Select.Label className="text-foreground-tertiary typography-sm py-2.5 px-2 pr-12 pl-8 uppercase">
      {children}
    </Select.Label>
  )
}
