import { ButtonHTMLAttributes, ForwardedRef, cloneElement, createElement, isValidElement } from 'react'
import { ModalTrigger } from '@/components/modal/modal.types'
import { isRef } from '@/utilities/isRef'
import { useModalActions } from './use-modal-store.hook'

export const Trigger = (
  {
    children,
    ...props
  }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    children?: ModalTrigger
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const { openModal } = useModalActions()

  if (!children) return null

  return isValidElement(children)
    ? cloneElement(children, {
        ref: isRef(ref) ? ref : undefined,
        ...props,
        onClick: () => openModal(),
      })
    : createElement(children, {
        ref: isRef(ref) ? ref : undefined,
        ...props,
        onClick: () => openModal(),
      })
}
