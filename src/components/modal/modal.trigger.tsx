import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { useModalActions } from './use-modal-store.hook'

export const Trigger = ({
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}) => {
  const { openModal } = useModalActions()

  if (!children) return null

  return children({
    ...props,
    onClick: () => {
      openModal()
    },
  })
}
