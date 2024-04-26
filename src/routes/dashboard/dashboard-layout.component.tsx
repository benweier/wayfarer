import { FleetContext } from '@/context/fleet.context'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { DashboardTemplate } from '@/templates/dashboard.tpl'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

export const DashboardLayout = ({ children = <Outlet /> }: PropsWithChildren) => {
  const ships = useSuspenseQuery(getShipListQuery())

  return (
    <DashboardTemplate>
      <FleetContext value={ships.data.data}>{children}</FleetContext>
    </DashboardTemplate>
  )
}
