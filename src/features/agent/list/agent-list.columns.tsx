import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import type {AgentListTableSchema} from './agent-list.types';

const columnHelper = createColumnHelper<AgentListTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.agent.symbol, {
    id: 'symbol',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.symbol')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const agentSymbol = getValue()

      return (
        <Link className="link" to="/agents/$agentSymbol" params={{ agentSymbol }}>
          {agentSymbol}
        </Link>
      )
    },
    minSize: 30,
    maxSize: 30,
  }),
  columnHelper.accessor((row) => row.agent.shipCount, {
    id: 'ship_count',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.ship_count')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <Translation>
          {(t) => {
            return t('formatter.number', { value: value })
          }}
        </Translation>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.agent.headquarters, {
    id: 'headquarters',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.headquarters')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const waypointSymbol = getValue()
      const [sector, system, waypoint] = waypointSymbol.split('-')

      return (
        <Link
          to="/systems/$systemSymbol/waypoint/$waypointSymbol"
          params={{ systemSymbol: `${sector}-${system}`, waypointSymbol: `${sector}-${system}-${waypoint}` }}
          className="link"
        >
          {waypointSymbol}
        </Link>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.agent.startingFaction, {
    id: 'faction',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.faction')}</Translation>
        </div>
      )
    },
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.agent.credits, {
    id: 'credits',
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.credits')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="text-right">
          <Translation>
            {(t) => {
              return t('formatter.number', { value: value })
            }}
          </Translation>
        </div>
      )
    },
    minSize: 20,
    maxSize: 20,
  }),
]
