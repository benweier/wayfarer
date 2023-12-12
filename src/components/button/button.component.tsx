import { cx } from 'class-variance-authority'
import { type Ref, forwardRef } from 'react'
import { button } from './button.cva'
import { type ButtonProps } from './button.types'

export const ButtonComponent = (
  { intent, size, kind, adornment, className, children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <button
      ref={ref}
      className={cx(
        button({ intent, size, kind }),
        { 'btn-adornment': !!adornment?.start || !!adornment?.end },
        className,
      )}
      {...props}
    >
      {adornment?.start && <span className="adornment-start flex items-center">{adornment.start}</span>}
      {children}
      {adornment?.end && <span className="adornment-end flex items-center">{adornment.end}</span>}
    </button>
  )
}

export const Button = forwardRef(ButtonComponent)
