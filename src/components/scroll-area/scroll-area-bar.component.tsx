import * as ScrollArea from '@radix-ui/react-scroll-area'

export const Scrollbar = ({
  orientation = 'vertical',
}: {
  orientation?: ScrollArea.ScrollAreaScrollbarProps['orientation']
}) => {
  return (
    <ScrollArea.Scrollbar
      className="z-50 flex touch-none select-none bg-background-secondary p-0.5 transition-colors duration-100 ease-out data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3"
      orientation={orientation}
    >
      <ScrollArea.Thumb className="relative flex-1 rounded-full bg-background-quaternary hover:cursor-grab active:cursor-grabbing" />
    </ScrollArea.Scrollbar>
  )
}
