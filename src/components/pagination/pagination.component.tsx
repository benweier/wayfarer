import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useTranslation } from 'react-i18next'
import type { PaginationProps } from './pagination.types'
import { getPagingRange } from './pagination.utils'
import { usePaginationHandlers } from './use-pagination-handlers.hook'

export const Pagination = ({ current, min = 1, max, length = 5, onChange }: PaginationProps) => {
  const { t } = useTranslation()
  const pages = getPagingRange({ current, max, length })
  const handlers = usePaginationHandlers({ current, min, max }, onChange)

  return (
    <div className="flex gap-2">
      <Button
        key="first"
        intent="success"
        kind="outline"
        onClick={handlers.firstPage}
        disabled={current <= 1}
        aria-label={t('general.first_page')}
      >
        <AppIcon id="chevron:double-left" className="size-5" />
        <span className="sr-only">Page 1</span>
      </Button>
      <Button
        key="previous"
        intent="success"
        kind="outline"
        onClick={handlers.prevPage}
        disabled={current <= min}
        aria-label={t('general.previous_page')}
      >
        <AppIcon id="chevron:left" className="size-5" />
        <span className="sr-only">Page {current - 1}</span>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          intent="info"
          kind={page === current ? 'solid' : 'outline'}
          onClick={handlers.goto(page)}
          aria-label={t('general.go_to_page', { page })}
          aria-current={page === current ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      <Button
        key="next"
        intent="success"
        kind="outline"
        onClick={handlers.nextPage}
        disabled={current >= max}
        aria-label={t('general.next_page')}
      >
        <AppIcon id="chevron:right" className="size-5" />
        <span className="sr-only">Page {current + 1}</span>
      </Button>
      <Button
        key="last"
        intent="success"
        kind="outline"
        onClick={handlers.lastPage}
        disabled={current >= max}
        aria-label={t('general.last_page')}
      >
        <AppIcon id="chevron:double-right" className="size-5" />
        <span className="sr-only">Page {max}</span>
      </Button>
    </div>
  )
}
