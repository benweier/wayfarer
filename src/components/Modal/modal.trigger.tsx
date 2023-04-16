import {
  ComponentPropsWithRef,
  FC,
  ForwardedRef,
  ReactElement,
  cloneElement,
  createElement,
  isValidElement,
} from 'react'
import { isRef } from '@/utilities/isRef'
import { useModalActions } from './use-modal-store.hook'

export const Trigger = (
  {
    children,
  }: {
    children?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const { openModal } = useModalActions()

  if (!children) return null

  return isValidElement(children)
    ? cloneElement(children, {
        ref: isRef(ref) ? ref : undefined,
        onClick: () => openModal(),
      })
    : createElement(children, {
        ref: isRef(ref) ? ref : undefined,
        onClick: () => openModal(),
      })
}
