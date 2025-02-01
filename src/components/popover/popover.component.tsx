import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { PropsWithChildren, ReactNode } from 'react'

export const Popover = ({ trigger, children }: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="popover relative z-50 origin-(--radix-popover-content-transform-origin) rounded-md bg-background-primary/90 p-6 ring-3 ring-border-primary/20 backdrop-blur-lg will-change-[transform,opacity]"
          sideOffset={8}
          collisionPadding={16}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
