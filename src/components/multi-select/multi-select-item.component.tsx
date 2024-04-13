import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type ForwardedRef, forwardRef } from 'react'
import { AppIcon } from '@/components/icons'

const MultiSelectItemComponent = (
  { children, ...props }: ToggleGroup.ToggleGroupItemProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <ToggleGroup.Item
      ref={ref}
      {...props}
      className="group typography-sm hover:bg-background-secondary focus:bg-background-secondary relative relative w-full cursor-pointer rounded py-2 pr-14 pl-2 outline-none "
    >
      {children}

      <div className="absolute inset-y-0 right-1 hidden w-6 items-center justify-center group-data-[state=on]:inline-flex">
        <AppIcon id="check" aria-hidden="true" className="text-foreground-success-primary size-4" />
      </div>
    </ToggleGroup.Item>
  )
}

export const Item = forwardRef(MultiSelectItemComponent)
