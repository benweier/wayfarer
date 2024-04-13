import * as Popover from '@radix-ui/react-popover'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cx } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'
import { Root } from './multi-select.group'
import styles from './multi-select.module.css'
import { type MultiSelectFieldProps } from './multi-select.types'

export const Field = ({ trigger, id, value, onChange, children }: PropsWithChildren<MultiSelectFieldProps>) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="center"
          className={cx(
            styles.popover,
            'bg-background-primary border-border-primary relative z-50 rounded-md border p-px',
          )}
          sideOffset={8}
        >
          <ScrollArea.Root className="h-full max-h-[320px] overflow-hidden" type="scroll">
            <ScrollArea.Viewport className="h-full max-h-[320px] p-2">
              <Root type="multiple" aria-labelledby={id} value={value} onValueChange={onChange}>
                {children}
              </Root>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="bg-background-secondary flex touch-none p-0.5 transition-colors duration-100 ease-out select-none data-[orientation=vertical]:w-3"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="bg-background-tertiary relative flex-1 rounded-full before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
