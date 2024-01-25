import { useSuspenseQuery } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'
import { type PropsWithChildren } from 'react'
import { FleetContext } from '@/context/fleet.context'
import { getShipListQuery } from '@/services/api/spacetraders'
import { DashboardTemplate } from '@/templates/dashboard.tpl'

export const DashboardLayout = ({ children = <Outlet /> }: PropsWithChildren) => {
  const ships = useSuspenseQuery(getShipListQuery())

  return (
    <DashboardTemplate>
      <FleetContext.Provider value={ships.data.data}>{children}</FleetContext.Provider>
    </DashboardTemplate>
  )
}
