import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { PropsWithChildren, ReactNode } from 'react'

export const Tooltip = ({ trigger, children }: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <button type="button" className="btn">
            {trigger}
          </button>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="typography-sm max-w-96 rounded-md bg-foreground-secondary px-4 py-2 text-background-secondary"
            sideOffset={5}
          >
            {children}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
