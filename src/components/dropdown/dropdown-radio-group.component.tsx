import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { RefAttributes } from 'react'

export const RadioGroup = (props: DropdownMenu.DropdownMenuRadioGroupProps & RefAttributes<HTMLDivElement>) => (
  <DropdownMenu.RadioGroup {...props} />
)
