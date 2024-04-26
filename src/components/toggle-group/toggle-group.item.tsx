import * as ToggleGroup from '@radix-ui/react-toggle-group'
import type { RefAttributes } from 'react'

export const Item = ({
  ref,
  children,
  ...props
}: ToggleGroup.ToggleGroupItemProps & RefAttributes<HTMLButtonElement>) => {
  return (
    <ToggleGroup.Item ref={ref} {...props} className="toggle-group-item">
      {children}
    </ToggleGroup.Item>
  )
}
