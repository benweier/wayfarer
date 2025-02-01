import { Slot, Slottable } from '@radix-ui/react-slot'
import { cx } from 'class-variance-authority'
import { twm } from '@/utilities/twm.helper'
import { button } from './button.styles'
import type { ButtonProps } from './button.types'

export const Button = ({
  ref,
  asChild = false,
  intent,
  size,
  kind,
  icon,
  adornment,
  className,
  children,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      ref={ref}
      className={twm(
        button({
          intent,
          size,
          kind,
          icon,
        }),
        cx({ 'btn-adornment': !!adornment }),
        className,
      )}
      {...props}
    >
      <span className="adornment-start">{adornment?.start}</span>
      <Slottable>{children}</Slottable>
      <span className="adornment-end">{adornment?.end}</span>
    </Component>
  )
}
