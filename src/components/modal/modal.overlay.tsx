import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = () => {
  return <Dialog.Overlay className="backdrop-blur-xs bg-background-primary/20 fixed inset-0 z-40" />
}
