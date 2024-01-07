import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { waypointRoute } from '@/routes/waypoint.route'
import { formatDateTime } from '@/utilities/date'
import { formatNumber } from '@/utilities/number'
import { ContractListContext } from './contract-list.context'
import { type ContractListTableSchema } from './contract-list.types'

const columnHelper = createColumnHelper<ContractListTableSchema>()

export const availableContractsColumns = [
  columnHelper.accessor((row) => row.contract.id, {
    id: 'id',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.id')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.contract.type, {
    id: 'type',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.type')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex justify-start">
          <Badge>
            <Translation ns="spacetraders.contract_type">{(t) => t(value)}</Translation>
          </Badge>
        </div>
      )
    },
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => row.contract.terms.deliver, {
    id: 'units_required',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.units_required')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex flex-col gap-1 text-left text-sm">
          {value.map((item) => {
            const [sector, system, waypoint] = item.destinationSymbol.split('-')

            return (
              <div key={item.tradeSymbol}>
                [
                <Link
                  to={waypointRoute.to}
                  params={{ systemSymbol: `${sector}-${system}`, waypointSymbol: `${sector}-${system}-${waypoint}` }}
                  className="link"
                >
                  {item.destinationSymbol}
                </Link>
                ] <Translation>{(t) => t(item.tradeSymbol, { ns: 'spacetraders.trade_good' })}</Translation>{' '}
                <span className="text-secondary">({formatNumber(item.unitsRequired)})</span>
              </div>
            )
          })}
        </div>
      )
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.contract.deadlineToAccept, {
    id: 'accept_deadline',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.deadline_to_accept')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return <div className="text-left text-sm">{formatDateTime(value)}</div>
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.contract.terms.deadline, {
    id: 'deliver_deadline',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.deadline_to_deliver')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return <div className="text-left text-sm">{formatDateTime(value)}</div>
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.contract.terms.payment, {
    id: 'payment',
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.payment')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const payment = getValue()

      return (
        <div className="text-right text-sm">
          {formatNumber(payment.onFulfilled)}{' '}
          <span className="text-secondary">({formatNumber(payment.onAccepted)})</span>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <ContractListContext.Consumer>
            {(ctx) => {
              return ctx.Action && <ctx.Action contract={row.original.contract} />
            }}
          </ContractListContext.Consumer>
        </div>
      )
    },
    minSize: 5,
    maxSize: 5,
  }),
]

export const acceptedContractsColumns = [
  columnHelper.accessor((row) => row.contract.id, {
    id: 'id',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.id')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return <div>{value}</div>
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.contract.type, {
    id: 'type',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.type')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex justify-start">
          <Badge>
            <Translation ns="spacetraders.contract_type">{(t) => t(value)}</Translation>
          </Badge>
        </div>
      )
    },
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => row.contract.terms.deliver, {
    id: 'units_required',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.units_required')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex flex-col gap-1 text-left text-sm">
          {value.map((item) => {
            const [sector, system, waypoint] = item.destinationSymbol.split('-')

            return (
              <div key={item.tradeSymbol}>
                [
                <Link
                  to={waypointRoute.to}
                  params={{ systemSymbol: `${sector}-${system}`, waypointSymbol: `${sector}-${system}-${waypoint}` }}
                  className="link"
                >
                  {item.destinationSymbol}
                </Link>
                ] <Translation>{(t) => t(item.tradeSymbol, { ns: 'spacetraders.trade_good' })}</Translation>{' '}
                <span className="text-secondary">({formatNumber(item.unitsRequired)})</span>
              </div>
            )
          })}
        </div>
      )
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.contract.terms.deliver, {
    id: 'units_delivered',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.units_delivered')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex flex-col gap-1 text-left text-sm">
          {value.map((item) => {
            const [sector, system, waypoint] = item.destinationSymbol.split('-')

            return (
              <div key={item.tradeSymbol}>
                [
                <Link
                  to={waypointRoute.to}
                  params={{ systemSymbol: `${sector}-${system}`, waypointSymbol: `${sector}-${system}-${waypoint}` }}
                  className="link"
                >
                  {item.destinationSymbol}
                </Link>
                ] <Translation>{(t) => t(item.tradeSymbol, { ns: 'spacetraders.trade_good' })}</Translation>{' '}
                <span className="text-secondary">({formatNumber(item.unitsFulfilled)})</span>
              </div>
            )
          })}
        </div>
      )
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.contract.terms.deadline, {
    id: 'deliver_deadline',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.deadline_to_deliver')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return <div className="text-left text-sm">{formatDateTime(value)}</div>
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.contract.terms.payment, {
    id: 'payment',
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.payment')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const payment = getValue()

      return (
        <div className="text-right text-sm">
          {formatNumber(payment.onFulfilled)}{' '}
          <span className="text-secondary">({formatNumber(payment.onAccepted)})</span>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <ContractListContext.Consumer>
            {(ctx) => {
              return ctx.Action && <ctx.Action contract={row.original.contract} />
            }}
          </ContractListContext.Consumer>
        </div>
      )
    },
    minSize: 5,
    maxSize: 5,
  }),
]

export const completedContractsColumns = [
  columnHelper.accessor((row) => row.contract.id, {
    id: 'id',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.id')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.contract.type, {
    id: 'type',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.type')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex justify-start">
          <Badge>
            <Translation ns="spacetraders.contract_type">{(t) => t(value)}</Translation>
          </Badge>
        </div>
      )
    },
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => row.contract.terms.deliver, {
    id: 'units_delivered',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.units_delivered')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex flex-col gap-1 text-left text-sm">
          {value.map((item) => {
            const [sector, system, waypoint] = item.destinationSymbol.split('-')

            return (
              <div key={item.tradeSymbol}>
                [
                <Link
                  to={waypointRoute.to}
                  params={{ systemSymbol: `${sector}-${system}`, waypointSymbol: `${sector}-${system}-${waypoint}` }}
                  className="link"
                >
                  {item.destinationSymbol}
                </Link>
                ] <Translation>{(t) => t(item.tradeSymbol, { ns: 'spacetraders.trade_good' })}</Translation>{' '}
                <span className="text-secondary">({formatNumber(item.unitsFulfilled)})</span>
              </div>
            )
          })}
        </div>
      )
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.contract.terms.payment, {
    id: 'payment',
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.payment')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const payment = getValue()

      return (
        <div className="text-right text-sm">
          {formatNumber(payment.onFulfilled)}{' '}
          <span className="text-secondary">({formatNumber(payment.onAccepted)})</span>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
]
