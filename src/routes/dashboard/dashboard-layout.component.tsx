import { FleetContext } from '@/context/fleet.context'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { DashboardTemplate } from '@/templates/dashboard.tpl'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { type Action, useRegisterActions } from 'kbar'
import { type PropsWithChildren, useMemo } from 'react'

export const DashboardLayout = ({ children = <Outlet /> }: PropsWithChildren) => {
  const ships = useSuspenseQuery(getShipListQuery())
  const navigate = useNavigate()

  const actions = useMemo<Action[]>(() => {
    return [
      {
        id: 'fleet',
        name: 'Fleet',
        shortcut: ['Alt+KeyF'],
        keywords: 'ships',
        perform: () => {
          void navigate({ to: '/fleet' })
        },
      },
      {
        id: 'systems',
        name: 'Systems',
        shortcut: ['Alt+KeyM'],
        keywords: 'systems map',
        perform: () => {
          void navigate({ to: '/systems' })
        },
      },
      {
        id: 'contracts',
        name: 'Contracts',
        shortcut: ['Alt+KeyC'],
        keywords: 'contracts',
        perform: () => {
          void navigate({ to: '/contracts' })
        },
      },
      {
        id: 'surveys',
        name: 'Surveys',
        shortcut: ['Alt+KeyS'],
        keywords: 'surveys',
        perform: () => {
          void navigate({ to: '/surveys' })
        },
      },
      {
        id: 'leaderboard',
        name: 'Leaderboard',
        shortcut: ['Alt+KeyL'],
        keywords: 'leaderboard',
        perform: () => {
          void navigate({ to: '/leaderboard' })
        },
      },
      {
        id: 'agents',
        name: 'Agents',
        shortcut: ['Alt+KeyA'],
        keywords: 'agents',
        perform: () => {
          void navigate({ to: '/agents' })
        },
      },
    ]
  }, [navigate])

  useRegisterActions(actions)

  return (
    <DashboardTemplate>
      <FleetContext value={ships.data.data}>{children}</FleetContext>
    </DashboardTemplate>
  )
}
