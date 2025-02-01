import * as Dialog from '@radix-ui/react-dialog'

export const Title = (props: Dialog.DialogTitleProps) => {
  return <Dialog.Title {...props} className="text-h4 font-semibold" />
}
