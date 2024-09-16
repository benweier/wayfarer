import { AppIcon } from '@/components/icons'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import type { RefAttributes } from 'react'

export const Item = ({
  ref,
  children,
  ...props
}: ToggleGroup.ToggleGroupItemProps & RefAttributes<HTMLButtonElement>) => {
  return (
    <ToggleGroup.Item
      ref={ref}
      {...props}
      className="group typography-sm relative relative w-full cursor-pointer rounded py-2 pr-14 pl-2 outline-none hover:bg-background-secondary focus:bg-background-secondary "
    >
      {children}

      <div className="absolute inset-y-0 right-1 hidden w-6 items-center justify-center group-data-[state=on]:inline-flex">
        <AppIcon id="check" aria-hidden="true" className="size-4 text-foreground-success-primary" />
      </div>
    </ToggleGroup.Item>
  )
}
