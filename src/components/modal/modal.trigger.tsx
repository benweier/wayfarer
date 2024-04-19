import { useModalActions } from '@/components/modal/use-modal-store.hook'
import * as Dialog from '@radix-ui/react-dialog'

export const Trigger = ({ children, ...props }: Dialog.DialogTriggerProps) => {
  const actions = useModalActions()

  return (
    <Dialog.Trigger
      {...props}
      asChild
      onClick={() => {
        actions.openModal()
      }}
    >
      {children}
    </Dialog.Trigger>
  )
}
