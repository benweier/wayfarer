import { cx } from '@/utilities/cx.helper'
import type { RefAttributes } from 'react'
import { button } from './button.styles'
import type { ButtonProps } from './button.types'

export const Button = ({
  ref,
  intent,
  size,
  kind,
  icon,
  adornment,
  className,
  children,
  ...props
}: ButtonProps & RefAttributes<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      className={button({
        intent,
        size,
        kind,
        icon,
        className: cx({ 'btn-adornment': !!adornment?.start || !!adornment?.end }, className),
      })}
      {...props}
    >
      {adornment?.start && <span className="adornment-start">{adornment.start}</span>}
      {children}
      {adornment?.end && <span className="adornment-end">{adornment.end}</span>}
    </button>
  )
}
