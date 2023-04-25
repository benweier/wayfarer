import { Listbox } from '@headlessui/react'

export const Label = ({ children }: WithChildren) => {
  return (
    <Listbox.Label as="label" className="label">
      {children}
    </Listbox.Label>
  )
}
