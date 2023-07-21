import { AppIcon } from '@/components/icons'
import { cx } from '@/utilities/cx'
import { type PaginationProps } from './pagination.types'
import { getPagingRange } from './pagination.utils'

export const Pagination = ({ current, total, length = 5, onChange }: PaginationProps) => {
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
        <AppIcon id="chevron:double-left" className="h-5 w-5" />
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
        <AppIcon id="chevron:left" className="h-5 w-5" />
        <span className="sr-only">Page {current - 1}</span>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={cx('btn btn-primary w-16 p-1 font-bold', { 'btn-outline': page !== current })}
          onClick={() => {
            if (current !== page) onChange(page)
          }}
          aria-label={`Go to page ${page}`}
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
        <AppIcon id="chevron:right" className="h-5 w-5" />
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
        <AppIcon id="chevron:double-right" className="h-5 w-5" />
        <span className="sr-only">Page {total}</span>
      </button>
    </div>
  )
}
