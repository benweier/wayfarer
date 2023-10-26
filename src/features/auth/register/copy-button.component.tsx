import { cx } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'react'
import { AppIcon } from '@/components/icons'

export const Copy = ({
  className,
  children = <AppIcon id="clipboard" className="h-5 w-5" />,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type="button"
      className={cx(
        'rounded-full border-0 p-2 focus:outline-none focus:ring focus:ring-blue-500 enabled:hover:text-blue-400 disabled:cursor-default disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  )
}
