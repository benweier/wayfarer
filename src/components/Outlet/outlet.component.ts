import { useRef } from 'react'
import { OutletProps, useOutlet } from 'react-router-dom'

export const Outlet = ({ context }: OutletProps) => {
  const outlet = useOutlet(context)
  const ref = useRef({ outlet })

  return ref.current.outlet
}