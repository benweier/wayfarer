import {
  ComponentPropsWithRef,
  FC,
  ForwardedRef,
  ReactElement,
  cloneElement,
  createElement,
  isValidElement,
} from 'react'
import { useModalContext } from '@/components/Modal/useModalContext.hook'
import { isRef } from '@/utilities/isRef'

export const Trigger = (
  {
    children,
  }: {
    children?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const openModal = useModalContext((state) => state.openModal)

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
