import * as Popover from '@radix-ui/react-popover'
import * as ScrollArea from '@/components/scroll-area'
import { Options } from './multi-select-options.component'
import type { MultiSelectFieldProps } from './multi-select.types'
import type { PropsWithChildren } from 'react'

export const Field = ({ trigger, id, value, onChange, children }: PropsWithChildren<MultiSelectFieldProps>) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content side="bottom" align="center" sideOffset={8} asChild>
          <div className="popover z-50 rounded-md border border-border-primary bg-background-primary">
            <ScrollArea.Root height={320}>
              <ScrollArea.Viewport className="p-2">
                <Options type="multiple" aria-labelledby={id} value={value} onValueChange={onChange}>
                  {children}
                </Options>
              </ScrollArea.Viewport>

              <ScrollArea.Scrollbar orientation="vertical" />
            </ScrollArea.Root>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
