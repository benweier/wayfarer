import { button } from './button.cva'
import { type ButtonProps } from './button.types'

export const Button = ({ intent, size, kind, className, children, ...props }: ButtonProps) => {
  return (
    <button className={button({ intent, size, kind, className })} {...props}>
      {children}
    </button>
  )
}
