import { Suspense } from 'react'
import { IconContext } from 'react-icons'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { VscGithub, VscRocket } from 'react-icons/vsc'
import { Navigate, Outlet } from 'react-router-dom'
import { SpaceTradersStatus, useSpaceTradersStatus } from '@/components/SpaceTradersStatus'
import { Wayfarer } from '@/components/Wayfarer'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { useAuthStore } from '@/services/store/auth'

const Status = () => {
  const { status } = useSpaceTradersStatus()

  return (
    <>
      <span className="text-sm">Status:</span>
      <SpaceTradersStatus />
      <span className="text-sm font-semibold">{status}</span>
    </>
  )
}

export const Layout = () => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation<{ origin: string }>()

  if (isAuthenticated) {
    return <Navigate to={location.state?.origin ?? ROUTES.OVERVIEW} replace />
  }

  return (
    <div className="grid min-h-screen w-full auto-rows-min items-center gap-6 [grid-template-rows:auto_1fr_auto]">
      <div className="grid grid-flow-row items-center justify-center py-8">
        <div className="place-self-center text-zinc-500">
          <GiNorthStarShuriken size={64} />
        </div>
        <Wayfarer className="text-center text-6xl font-black lg:text-7xl" />
        <div className="text-center text-xl font-semibold text-zinc-500">A SpaceTraders API Interface</div>
        <div className="grid grid-flow-col items-center justify-center gap-2 py-4">
          <Status />
        </div>
      </div>

      <div>
        <div className="bg-zinc-200/40 dark:bg-zinc-700/20">
          <div className="mx-auto grid w-full max-w-lg items-center">
            <div className="p-8">
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-col gap-8 py-8">
        <div className="grid grid-flow-col items-center justify-center gap-8 text-zinc-500">
          <IconContext.Provider value={{ size: '32' }}>
            <a
              href="https://spacetraders.io"
              title="SpaceTraders"
              className="rounded-full p-1 outline-none ring-emerald-400 ring-offset-2 focus:ring-2 focus:ring-offset-gray-800"
            >
              <VscRocket />
            </a>
            <a
              href="https://github.com/benweier/wayfarer"
              title="GitHub"
              className="rounded-full p-1 outline-none ring-emerald-400 ring-offset-2 focus:ring-2 focus:ring-offset-gray-800"
            >
              <VscGithub />
            </a>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}
