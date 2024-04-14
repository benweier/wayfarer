import * as Popover from '@radix-ui/react-popover'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { type PropsWithChildren } from 'react'
import { Options } from './multi-select-options.component'
import { type MultiSelectFieldProps } from './multi-select.types'

export const Field = ({ trigger, id, value, onChange, children }: PropsWithChildren<MultiSelectFieldProps>) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content side="bottom" align="center" sideOffset={8} asChild>
          <ScrollArea.Root
            className="popover bg-background-primary border-border-primary relative z-50 h-full max-h-[320px] overflow-hidden rounded-md border"
            type="scroll"
          >
            <ScrollArea.Viewport className="h-full max-h-[320px] p-2">
              <Options type="multiple" aria-labelledby={id} value={value} onValueChange={onChange}>
                {children}
              </Options>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="bg-background-secondary flex touch-none rounded-tr-md rounded-br-md p-0.5 transition-colors duration-100 ease-out select-none data-[orientation=vertical]:w-3"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="bg-background-tertiary relative flex-1 rounded-full" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
