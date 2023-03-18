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
    as,
  }: {
    as?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const openModal = useModalContext((state) => state.openModal)

  if (!as) return null

  return isValidElement(as)
    ? cloneElement(as, {
        ref: isRef(ref) ? ref : undefined,
        onClick: () => openModal(),
      })
    : createElement(as, {
        ref: isRef(ref) ? ref : undefined,
        onClick: () => openModal(),
      })
}
