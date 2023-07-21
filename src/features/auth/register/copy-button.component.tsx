import { ClipboardIcon } from '@heroicons/react/24/outline'
import { type ButtonHTMLAttributes } from 'react'
import { cx } from '@/utilities/cx'

export const Copy = ({
  className,
  children = <ClipboardIcon className="h-5 w-5" />,
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
