import type { ToggleGroupMultipleProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type ForwardedRef, type RefAttributes, forwardRef } from 'react'

const ToggleGroupRootComponent = (
  props: (ToggleGroupSingleProps | ToggleGroupMultipleProps) & RefAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return <ToggleGroup.Root ref={ref} {...props} className="toggle-group" />
}

export const Root = forwardRef(ToggleGroupRootComponent)
