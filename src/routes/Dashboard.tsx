import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import tw, { theme } from 'twin.macro'
import { Outlet } from '@/components/Outlet'
import { Transition } from '@/components/Transition'
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
        <Transition>
          <Outlet />
        </Transition>
      </Suspense>
    </DashboardTemplate>
  )
}
