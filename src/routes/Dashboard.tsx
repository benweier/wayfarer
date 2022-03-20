import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Outlet } from 'react-router'
import tw, { theme } from 'twin.macro'
import { DashboardTemplate } from '@/templates/Dashboard'

export const DashboardPage = () => {
  return (
    <DashboardTemplate>
      <Suspense
        fallback={
          <div css={tw`grid justify-center items-center animate-pulse h-96`}>
            <GiNorthStarShuriken size={96} color={theme`colors.gray.700`} />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardTemplate>
  )
}
