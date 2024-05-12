import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useTranslation } from 'react-i18next'
import type { PaginationProps } from './pagination.types'
import { getPagingRange } from './pagination.utils'

export const Pagination = ({ current, min, max, length = 5, onChange }: PaginationProps) => {
  const { t } = useTranslation()
  const pages = getPagingRange({ current, max, length })

  return (
    <div className="flex gap-2">
      <Button
        key="first"
        intent="success"
        kind="outline"
        onClick={() => {
          if (current > min) onChange(min)
        }}
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
        onClick={() => {
          if (current > min) onChange(current - 1)
        }}
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
          onClick={() => {
            if (current !== page) onChange(page)
          }}
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
        onClick={() => {
          if (current < max) onChange(current + 1)
        }}
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
        onClick={() => {
          if (current < max) onChange(max)
        }}
        disabled={current >= max}
        aria-label={t('general.last_page')}
      >
        <AppIcon id="chevron:double-right" className="size-5" />
        <span className="sr-only">Page {max}</span>
      </Button>
    </div>
  )
}
