import { createContext } from 'react'
import { ModalContextType } from './types.d'

const noop = () => {
  // do nothing
}

export const ModalContext = createContext<ModalContextType>({
  ref: undefined,
  isOpen: false,
  openModal: noop,
  closeModal: noop,
  toggleModal: noop,
})
