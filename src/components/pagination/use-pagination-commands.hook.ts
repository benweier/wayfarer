import { useNavigate, useRouterState } from '@tanstack/react-router'
import { type Action, useRegisterActions } from 'kbar'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const usePaginationCommands = ({ min, max }: { min: number; max: number }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isTransitioning } = useRouterState()

  const actions = useMemo<Action[]>(() => {
    return [
      {
        id: 'previous-page',
        name: t('general.previous_page'),
        shortcut: ['Alt+ArrowLeft'],
        perform: () => {
          if (isTransitioning) return

          void navigate({
            search: ({ page = 1 }) => {
              if (page <= min) return { page: min }

              return { page: page - 1 }
            },
          })
        },
      },
      {
        id: 'next-page',
        name: t('general.next_page'),
        shortcut: ['Alt+ArrowRight'],
        perform: () => {
          if (isTransitioning) return

          void navigate({
            search: ({ page = 1 }) => {
              if (page >= max) return { page: max }

              return { page: page + 1 }
            },
          })
        },
      },
    ]
  }, [isTransitioning, navigate, t, min, max])

  useRegisterActions(actions)
}
