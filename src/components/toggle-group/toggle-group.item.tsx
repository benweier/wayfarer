import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type ForwardedRef, forwardRef } from 'react'

const ToggleGroupItemComponent = (
  { children, ...props }: ToggleGroup.ToggleGroupItemProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <ToggleGroup.Item ref={ref} {...props} className="toggle-group-item">
      {children}
    </ToggleGroup.Item>
  )
}

export const Item = forwardRef(ToggleGroupItemComponent)
