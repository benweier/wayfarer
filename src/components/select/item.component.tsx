import * as Select from '@radix-ui/react-select'
import { cx } from 'class-variance-authority'
import { type ForwardedRef, forwardRef } from 'react'
import { AppIcon } from '@/components/icons'

const ItemComponent = (
  { children, className, ...props }: Select.SelectItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <Select.Item
      className={cx(
        'group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-secondary data-[highlighted]:text-foreground-primary typography-sm relative flex items-center rounded-sm py-2 pr-16 pl-8 select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
        className,
      )}
      ref={ref}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-1 inline-flex w-6 items-center justify-center">
        <AppIcon id="check" aria-hidden="true" className="text-foreground-success-primary size-4" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

export const Item = forwardRef(ItemComponent)
