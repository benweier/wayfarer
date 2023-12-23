import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { SurveyContext } from '@/features/survey/context'
import { formatDateTime } from '@/utilities/date'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { type SurveyListTableSchema } from './survey-list.types'

const columnHelper = createColumnHelper<SurveyListTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.survey.signature, {
    id: 'signature',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.signature')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="size-4" />
            </Button>
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
      return <div>{getValue()}</div>
    },
    sortDescFirst: false,
    enableSorting: true,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => new Date(row.survey.expiration), {
    id: 'expiration',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.expiration')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="size-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return <div>{formatDateTime(value)}</div>
    },
    enableSorting: true,
    enableColumnFilter: true,
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
