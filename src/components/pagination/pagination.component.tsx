import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { type PaginationProps } from './pagination.types'
import { getPagingRange } from './pagination.utils'

export const Pagination = ({ current, total, length = 5, onChange }: PaginationProps) => {
  const pages = getPagingRange({ current, total, length })

  return (
    <div className="flex gap-2">
      <Button
        key="first"
        intent="confirm"
        kind="outline"
        onClick={() => {
          if (current > 1) onChange(1)
        }}
        disabled={current <= 1}
        aria-label="First page"
      >
        <AppIcon id="chevron:double-left" className="size-5" />
        <span className="sr-only">Page 1</span>
      </Button>
      <Button
        key="previous"
        intent="confirm"
        kind="outline"
        onClick={() => {
          if (current > 1) onChange(current - 1)
        }}
        disabled={current <= 1}
        aria-label="Previous page"
      >
        <AppIcon id="chevron:left" className="size-5" />
        <span className="sr-only">Page {current - 1}</span>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          intent="primary"
          kind={page === current ? 'solid' : 'outline'}
          onClick={() => {
            if (current !== page) onChange(page)
          }}
          aria-label={`Go to page ${page}`}
          aria-current={page === current ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      <Button
        key="next"
        intent="confirm"
        kind="outline"
        onClick={() => {
          if (current < total) onChange(current + 1)
        }}
        disabled={current >= total}
        aria-label="Next page"
      >
        <AppIcon id="chevron:right" className="size-5" />
        <span className="sr-only">Page {current + 1}</span>
      </Button>
      <Button
        key="last"
        intent="confirm"
        kind="outline"
        onClick={() => {
          if (current < total) onChange(total)
        }}
        disabled={current >= total}
        aria-label="Last page"
      >
        <AppIcon id="chevron:double-right" className="size-5" />
        <span className="sr-only">Page {total}</span>
      </Button>
    </div>
  )
}
