import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { Sort } from '@/components/table'
import { SurveyContext } from '@/features/survey/context'
import type { SurveyListTableSchema } from './survey-list.types'

const columnHelper = createColumnHelper<SurveyListTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.survey.signature, {
    id: 'signature',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.signature')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>
    },
    sortingFn: 'alphanumeric',
    enableSorting: true,
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.survey.size, {
    id: 'size',
    header: () => {
      return (
        <div className="flex items-center justify-start gap-2 text-left">
          <Translation>{(t) => <div>{t('general.header.size')}</div>}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <Translation>
          {(t) => <div className="text-sm">{t(value, { ns: 'spacetraders.survey_size' })}</div>}
        </Translation>
      )
    },
    sortDescFirst: false,
    enableSorting: true,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => new Date(row.survey.expiration), {
    id: 'expiration',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.expiration')}</div>}</Translation>
          <div>
            <Sort column={column} type="numeric" />
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return <Translation>{(t) => <div className="text-sm">{t('formatter.datetime', { value })}</div>}</Translation>
    },
    enableSorting: true,
    enableColumnFilter: true,
    sortDescFirst: false,
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.survey.deposits, {
    id: 'deposits',
    header: () => {
      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.deposits')}</div>}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()
      const deposits = value.reduce<Map<string, number>>((result, deposit) => {
        if (result.has(deposit.symbol)) {
          const count = result.get(deposit.symbol) ?? 0

          result.set(deposit.symbol, count + 1)

          return result
        }

        result.set(deposit.symbol, 1)

        return result
      }, new Map())

      return (
        <div className="flex flex-wrap items-center justify-end gap-1">
          {Array.from(deposits).map(([symbol, count]) => (
            <Badge key={symbol}>
              <Translation ns="spacetraders.trade_good">{(t) => t(symbol)}</Translation> x{count}
            </Badge>
          ))}
        </div>
      )
    },
    minSize: 30,
    maxSize: 30,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <SurveyContext.Consumer>
            {(ctx) => {
              return (
                <div className="flex items-center justify-end gap-2">
                  {ctx.Extract && <ctx.Extract survey={row.original.survey} />}
                  {ctx.Discard && <ctx.Discard survey={row.original.survey} />}
                </div>
              )
            }}
          </SurveyContext.Consumer>
        </div>
      )
    },
    minSize: 20,
    maxSize: 20,
  }),
]
