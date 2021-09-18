import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardTemplate } from 'templates/Dashboard'

export const DashboardPage = () => {
  return (
    <DashboardTemplate>
      <Suspense fallback={<></>}>
        <Outlet />
      </Suspense>
    </DashboardTemplate>
  )
}
