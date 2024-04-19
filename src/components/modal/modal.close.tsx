import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import * as Dialog from '@radix-ui/react-dialog'

export const Close = ({
  children = (
    <Button intent="danger" kind="outline" size="small" icon>
      <AppIcon id="x" className="size-3" />
    </Button>
  ),
  ...props
}: Dialog.DialogCloseProps) => {
  return (
    <Dialog.Close {...props} asChild>
      {children}
    </Dialog.Close>
  )
}
