import { AppIcon } from '@/components/icons'
import { cx } from '@/utilities/cx.helper'
import * as Select from '@radix-ui/react-select'
import type { RefAttributes } from 'react'

export const Item = ({
  ref,
  children,
  className,
  ...props
}: Select.SelectItemProps & RefAttributes<HTMLDivElement>) => {
  return (
    <Select.Item
      ref={ref}
      {...props}
      className={cx(
        'group typography-sm relative flex select-none items-center rounded-sm py-2 pr-16 pl-8 text-foreground-secondary data-[disabled]:pointer-events-none data-[highlighted]:bg-background-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:text-foreground-primary data-[highlighted]:outline-none',
        className,
      )}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-1 inline-flex w-6 items-center justify-center">
        <AppIcon id="check" aria-hidden="true" className="size-4 text-foreground-success-primary" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
