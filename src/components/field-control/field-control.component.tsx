import { useController } from 'react-hook-form'
import { FieldControlContext } from './field-control.context'
import type { PropsWithChildren } from 'react'
import type { FieldValues, Path, UseControllerProps } from 'react-hook-form'

export const Root = <T extends FieldValues = FieldValues, N extends Path<T> = Path<T>>({
  children,
  ...props
}: PropsWithChildren<UseControllerProps<T, N>>) => {
  const ctx = useController<T, N>(props)

  return (
    <FieldControlContext value={ctx}>
      <div className="form-control space-y-1">{children}</div>
    </FieldControlContext>
  )
}
