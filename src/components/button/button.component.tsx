import { cx } from 'class-variance-authority'
import type { RefAttributes } from 'react'
import { button } from './button.cva'
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
      className={cx(
        button({ intent, size, kind, icon }),
        { 'btn-adornment': !!adornment?.start || !!adornment?.end },
        className,
      )}
      {...props}
    >
      {adornment?.start && <span className="adornment-start">{adornment.start}</span>}
      {children}
      {adornment?.end && <span className="adornment-end">{adornment.end}</span>}
    </button>
  )
}
