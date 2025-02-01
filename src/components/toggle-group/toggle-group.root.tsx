import * as ToggleGroup from '@radix-ui/react-toggle-group'
import type { ToggleGroupMultipleProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import type { RefAttributes } from 'react'

export const Root = (props: (ToggleGroupSingleProps | ToggleGroupMultipleProps) & RefAttributes<HTMLDivElement>) => {
  return <ToggleGroup.Root {...props} className="toggle-group" />
}
