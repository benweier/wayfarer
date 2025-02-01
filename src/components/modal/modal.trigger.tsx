import * as Dialog from '@radix-ui/react-dialog'
import { useModalActions } from '@/components/modal/use-modal-store.hook'

export const Trigger = ({ children, ...props }: Dialog.DialogTriggerProps) => {
  const actions = useModalActions()

  return (
    <Dialog.Trigger
      {...props}
      asChild
      onClick={() => {
        actions.open()
      }}
    >
      {children}
    </Dialog.Trigger>
  )
}
