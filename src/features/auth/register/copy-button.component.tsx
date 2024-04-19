import { AppIcon } from '@/components/icons'
import { cx } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

export const Copy = ({
  className,
  children = <AppIcon id="clipboard" className="size-5" />,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type="button"
      className={cx(
        'rounded-full border-0 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none enabled:hover:text-blue-400 disabled:cursor-default disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  )
}
