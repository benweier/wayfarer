import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Outlet } from 'react-router'
import { DashboardTemplate } from '@/templates/Dashboard'

export const DashboardPage = () => {
  return (
    <DashboardTemplate>
      <Suspense
        fallback={
          <div className="grid h-96 animate-pulse items-center justify-center text-zinc-200 dark:text-zinc-700">
            <GiNorthStarShuriken size={96} />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardTemplate>
  )
}
