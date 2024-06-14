import { type PropsWithChildren, createContext } from 'react'
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form'

export const FieldControlContext = createContext<{
  field: ControllerRenderProps<any, any>
  fieldState?: ControllerFieldState
  formState?: UseFormStateReturn<any>
} | null>(null)

export const FieldControl = <T extends FieldValues, N extends Path<T>>({
  children,
  ...props
}: PropsWithChildren<{
  field: ControllerRenderProps<T, N>
  fieldState?: ControllerFieldState
  formState?: UseFormStateReturn<T>
}>) => {
  return (
    <FieldControlContext value={props}>
      <div className="form-control space-y-1">{children}</div>
    </FieldControlContext>
  )
}
