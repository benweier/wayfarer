import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { PropsWithChildren, ReactNode } from 'react'

export const Popover = ({ trigger, children }: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="popover origin-[var(--radix-popover-content-transform-origin)] bg-background-primary/90 ring-border-primary/20 relative z-50 rounded-md p-6 ring-3 backdrop-blur-lg will-change-[transform,opacity]"
          sideOffset={8}
          collisionPadding={16}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
