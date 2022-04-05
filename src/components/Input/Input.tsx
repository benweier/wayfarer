import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { isFunction } from '@/utilities/is-function'
import * as styles from './Input.styles'

export const InternalInput = (
  { name, icon, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; name: string; icon?: ReactNode },
  ref: ForwardedRef<HTMLInputElement | null> | null,
) => {
  const { register } = useFormContext()
  const input = register(name)

  return (
    <div css={styles.root}>
      <input
        {...input}
        ref={(node) => {
          input.ref(node)

          if (ref) {
            isFunction(ref) ? ref(node) : (ref.current = node)
          }
        }}
        {...props}
        css={[styles.input.DEFAULT, icon && styles.input.icon]}
      />
      {icon && <div css={styles.icon}>{icon}</div>}
    </div>
  )
}

export const Input = forwardRef(InternalInput)
