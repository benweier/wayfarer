import { Listbox } from '@headlessui/react'
import { type PropsWithChildren } from 'react'

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <Listbox.Label as="label" className="label">
      {children}
    </Listbox.Label>
  )
}
