import { type Ref, forwardRef } from 'react'
import { button } from './button.cva'
import { type ButtonProps } from './button.types'

export const ButtonComponent = (
  { intent, size, kind, className, children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <button ref={ref} className={button({ intent, size, kind, className })} {...props}>
      {children}
    </button>
  )
}

export const Button = forwardRef(ButtonComponent)
