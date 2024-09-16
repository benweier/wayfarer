import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = () => {
  return <Dialog.Overlay className="fixed inset-0 z-40 bg-background-primary/20 backdrop-blur-xs" />
}
