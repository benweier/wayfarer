import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useModalActions } from './use-modal-store.hook'

export const Close = ({
  onClick,
  children = (props) => (
    <Button intent="danger" kind="outline" size="small" icon {...props}>
      <AppIcon id="x" className="size-3" />
    </Button>
  ),
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}) => {
  const { closeModal } = useModalActions()

  if (!children) return null

  return children({
    ...props,
    onClick: (event) => {
      onClick?.(event)
      closeModal()
    },
  })
}
