import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { cx } from '@/utilities/cx'

const getPagingRange = ({ current, total, length }: { current: number; total: number; length: number }): number[] => {
  const pages = Math.min(length, total)

  let start = current - Math.floor(pages / 2)
  start = Math.max(start, 1)
  start = Math.min(start, 1 + total - length)

  return Array.from({ length: pages }, (_, i) => start + i)
}

export const Pagination = ({
  current,
  total,
  length = 5,
  onChange,
}: {
  current: number
  total: number
  length?: 3 | 5 | 7
  onChange: (page: number) => void
}) => {
  const pages = getPagingRange({ current, total, length })

  return (
    <div className="flex gap-2">
      <button
        key="first"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current > 1) onChange(1)
        }}
        disabled={current <= 1}
        aria-label="First page"
      >
        <ChevronDoubleLeftIcon className="h-5 w-5" />
        <span className="sr-only">Page 1</span>
      </button>
      <button
        key="previous"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current > 1) onChange(current - 1)
        }}
        disabled={current <= 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Page {current - 1}</span>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={cx('btn btn-primary w-16 p-1 font-bold', { 'btn-outline': page !== current })}
          onClick={() => {
            if (current !== page) onChange(page)
          }}
          aria-label={`Page ${page}`}
          aria-current={page === current ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        key="next"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current < total) onChange(current + 1)
        }}
        disabled={current >= total}
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Page {current + 1}</span>
      </button>
      <button
        key="last"
        className="btn flex w-16 items-center justify-center p-1 font-bold"
        onClick={() => {
          if (current < total) onChange(total)
        }}
        disabled={current >= total}
        aria-label="Last page"
      >
        <ChevronDoubleRightIcon className="h-5 w-5" />
        <span className="sr-only">Page {total}</span>
      </button>
    </div>
  )
}
