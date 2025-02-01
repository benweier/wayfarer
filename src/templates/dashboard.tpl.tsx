import { Link } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { Drawer } from '@/components/drawer'
import { AppIcon, MenuIcon } from '@/components/icons'
import { Preferences } from '@/components/preferences'
import { Desktop } from '@/components/responsive'
import { Wayfarer } from '@/components/wayfarer'
import { DesktopNavigation, MobileNavigation } from '@/features/navigation'
import { sidebarAtom } from '@/store/atoms/sidebar'
import { useAuthStore } from '@/store/auth'
import { cx } from '@/utilities/cx.helper'
import type { PropsWithChildren } from 'react'

const Logout = () => {
  const { t } = useTranslation()

  return (
    <Link
      to="/logout"
      className="flex @[220px]/side:w-full w-full items-center gap-4 rounded px-3 py-2 font-semibold text-white shadow-rose-900 transition-all duration-100 hover:scale-105 hover:bg-rose-700 hover:shadow active:scale-100"
    >
      <div className="size-6">
        <MenuIcon id="logout" className="size-6 text-rose-100" aria-hidden />
      </div>
      <span className="text-sm sr-only @[220px]/side:not-sr-only">{t('auth.logout', { context: 'action' })}</span>
    </Link>
  )
}

export const DashboardTemplate = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  const [sidebarState] = useAtom(sidebarAtom)

  return (
    <>
      {/* Static sidebar for desktop */}
      <Desktop>
        <div className="inset-y-0 z-10 hidden min-h-[100dvh] lg:fixed lg:flex">
          <div
            className={cx('@container/side flex flex-col transition-all duration-100 ease-in-out', {
              'w-20': sidebarState === 'collapsed',
              'w-56': sidebarState === 'expanded',
            })}
          >
            <div className="flex min-h-0 flex-1 flex-col bg-blue-600">
              <div className="flex-1">
                <div className="flex items-center justify-center bg-blue-700 py-4">
                  <Link to="/">
                    <div className="text-h3 text-center font-black text-white">
                      W<span className="@[220px]:inline hidden">ayfarer</span>
                    </div>
                  </Link>
                </div>

                <DesktopNavigation />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4">
                <Preferences />
              </div>
              {isAuthenticated ? (
                <div className="flex flex-shrink items-center justify-center gap-2 bg-rose-600 p-4">
                  <Logout />
                </div>
              ) : (
                <div className="flex flex-shrink items-center justify-center gap-2 bg-emerald-600 p-4">
                  <Link
                    to="/login"
                    search={{
                      redirect: `${window.location.pathname}${window.location.search}`,
                    }}
                    mask={{ to: '/login' }}
                    className="flex @[220px]/side:w-full w-full items-center gap-4 rounded px-3 py-2 font-medium text-white shadow-emerald-900 transition-all duration-100 hover:scale-105 hover:bg-emerald-700 hover:shadow active:scale-100"
                  >
                    <div className="size-6">
                      <MenuIcon id="login" className="size-6 text-emerald-100" aria-hidden />
                    </div>
                    <span className="text-sm sr-only @[220px]/side:not-sr-only">
                      {t('auth.login', { context: 'action' })}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Desktop>

      <div className="flex min-h-[100dvh] min-w-0 flex-1 flex-col">
        <Desktop
          fallback={
            <div className="flex items-center justify-between bg-blue-600 px-4 py-3 sm:px-6 lg:px-8">
              <div>
                <Link to="/">
                  <Wayfarer className="text-h5 text-white" />
                </Link>
              </div>

              <div>
                <Drawer
                  trigger={
                    <Drawer.Trigger>
                      <Button intent="info" kind="solid" icon>
                        <AppIcon id="hamburger" className="size-6" />
                      </Button>
                    </Drawer.Trigger>
                  }
                  direction="left"
                  shouldScaleBackground
                >
                  <Drawer.Overlay />
                  <Drawer.Content width={300} height="100dvh">
                    <div className="flex min-h-[100dvh] flex-col gap-6 p-6">
                      <Drawer.Header>
                        <Drawer.Title className="text-center">
                          <Wayfarer className="text-h1 text-white" />
                        </Drawer.Title>
                      </Drawer.Header>

                      <MobileNavigation />
                    </div>
                  </Drawer.Content>
                </Drawer>
              </div>
            </div>
          }
        />

        <main className="flex flex-1">
          <div
            className={cx('hidden transition-all duration-100 ease-in-out lg:block', {
              'w-20': sidebarState === 'collapsed',
              'w-56': sidebarState === 'expanded',
            })}
          />
          {/* Primary column */}
          <section className="relative flex h-full min-w-0 flex-1 flex-col">
            <Suspense
              fallback={
                <div className="flex h-full w-full animate-pulse items-center justify-center font-black text-5xl text-zinc-900/5 dark:text-zinc-500/10">
                  <div>Wayfarer</div>
                </div>
              }
            >
              {children}
            </Suspense>
          </section>

          {/* Secondary column */}
          <aside className="hidden lg:block lg:flex-shrink-0">
            <div className="relative flex h-full flex-col overflow-y-auto bg-background-secondary backdrop-blur-lg lg:w-64 2xl:w-96">
              {isAuthenticated && (
                <div className="p-4">
                  <Agent />
                </div>
              )}
            </div>
          </aside>
        </main>
      </div>
    </>
  )
}

const Agent = () => {
  const { agent, isAuthenticated } = useAuthStore()
  const { t } = useTranslation()

  if (!isAuthenticated) return null

  const [sector, system, waypoint] = agent.headquarters.split('-')

  return (
    <div>
      <div className="text-xl text-right font-black">{agent.symbol}</div>
      <div className="text-sm text-right">
        Credits: <span className="font-bold">{t('formatter.number', { value: agent.credits })}</span>
      </div>
      <div className="text-sm text-right">
        HQ:{' '}
        <span className="font-semibold">
          <Link
            className="link"
            to="/systems/$systemSymbol/waypoint/$waypointSymbol"
            params={{
              systemSymbol: `${sector}-${system}`,
              waypointSymbol: `${sector}-${system}-${waypoint}`,
            }}
          >
            {agent.headquarters}
          </Link>
        </span>
      </div>
      <div className="text-sm text-right">
        Faction: <span className="font-semibold">{agent.startingFaction}</span>
      </div>
      <div className="text-sm text-right">
        Ship Count: <span className="font-semibold">{t('formatter.number', { value: agent.shipCount })}</span>
      </div>
    </div>
  )
}
