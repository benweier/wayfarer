import * as ToggleGroup from '@radix-ui/react-toggle-group'
import type { ToggleGroupMultipleProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import type { RefAttributes } from 'react'

export const Options = ({
  ref,
  ...props
}: (ToggleGroupSingleProps | ToggleGroupMultipleProps) & RefAttributes<HTMLDivElement>) => {
  return <ToggleGroup.Root ref={ref} {...props} className="flex flex-col gap-1" />
}
