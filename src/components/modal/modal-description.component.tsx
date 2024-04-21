import * as Dialog from '@radix-ui/react-dialog'

export const Description = (props: Dialog.DialogDescriptionProps) => {
  return <Dialog.Description {...props} className="text-foreground-secondary typography-base" />
}
