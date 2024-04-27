import * as ScrollArea from '@radix-ui/react-scroll-area'

export const Scrollbar = ({
  orientation = 'vertical',
}: {
  orientation?: ScrollArea.ScrollAreaScrollbarProps['orientation']
}) => {
  return (
    <ScrollArea.Scrollbar
      className="bg-background-secondary flex touch-none rounded-tr-md rounded-br-md p-0.5 transition-colors duration-100 ease-out select-none data-[orientation=vertical]:w-3 data-[orientation=horizontal]:h-3"
      orientation={orientation}
    >
      <ScrollArea.Thumb className="bg-background-quaternary relative flex-1 rounded-full" />
    </ScrollArea.Scrollbar>
  )
}
