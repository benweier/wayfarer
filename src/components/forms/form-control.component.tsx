import { type PropsWithChildren, createContext } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export const FormControlContext = createContext<UseFormRegisterReturn | null>(null)

export const FormControl = ({ children, ...props }: PropsWithChildren<UseFormRegisterReturn>) => {
  return (
    <FormControlContext value={props}>
      <div className="form-control space-y-1">{children}</div>
    </FormControlContext>
  )
}
