import * as Dialog from '@radix-ui/react-dialog'

export const Title = (props: Dialog.DialogTitleProps) => {
  return <Dialog.DialogTitle {...props} className="display-sm font-semibold" />
}
