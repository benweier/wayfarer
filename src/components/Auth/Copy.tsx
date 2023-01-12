import { ButtonHTMLAttributes } from 'react'
import { HiOutlineDuplicate } from 'react-icons/hi'
import { cx } from '@/utilities/cx'

export const Copy = ({
  className,
  children = <HiOutlineDuplicate size={24} />,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type="button"
      className={cx(
        'cursor-default rounded border-0 p-1.5 text-gray-300 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-500 enabled:hover:cursor-pointer enabled:hover:text-blue-400 disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  )
}
