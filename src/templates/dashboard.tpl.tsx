import { Button } from '@/components/button'
import { Drawer } from '@/components/drawer'
import { AppIcon, MenuIcon } from '@/components/icons'
import { Preferences } from '@/components/preferences'
import { Desktop } from '@/components/responsive'
import { Wayfarer } from '@/components/wayfarer'
import { DesktopNavigation, MobileNavigation } from '@/features/navigation'
import { sidebarAtom } from '@/store/atoms/sidebar'
import { useAuthStore } from '@/store/auth'
import { formatNumber } from '@/utilities/number.helper'
import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { useAtom } from 'jotai'
import { type PropsWithChildren, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

const Logout = () => {
  const { t } = useTranslation()

  return (
    <Link
      to="/logout"
      className="flex w-full items-center gap-4 rounded py-2 px-3 font-semibold text-white shadow-rose-900 transition-all duration-100 hover:scale-105 hover:bg-rose-700 hover:shadow active:scale-100 @[220px]/side:w-full"
    >
      <div className="size-6">
        <MenuIcon id="logout" className="size-6 text-rose-100" aria-hidden />
      </div>
      <span className="typography-sm sr-only @[220px]/side:not-sr-only">{t('auth.logout', { context: 'action' })}</span>
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
        <div className="z-10 hidden min-h-[100dvh] lg:fixed lg:flex inset-y-0">
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
                    <div className="display-md text-center font-black text-white">
                      W<span className="hidden @[220px]:inline">ayfarer</span>
                    </div>
                  </Link>
                </div>

                <DesktopNavigation />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4">
                <Preferences />
              </div>
              {isAuthenticated ? (
                <div className="flex-shrink flex items-center justify-center gap-2 bg-rose-600 p-4">
                  <Logout />
                </div>
              ) : (
                <div className="flex-shrink flex items-center justify-center gap-2 bg-emerald-600 p-4">
                  <Link
                    to="/login"
                    search={{
                      redirect: `${window.location.pathname}${window.location.search}`,
                    }}
                    mask={{ to: '/login' }}
                    className="flex w-full items-center gap-4 rounded py-2 px-3 font-medium text-white shadow-emerald-900 transition-all duration-100 hover:scale-105 hover:bg-emerald-700 hover:shadow active:scale-100 @[220px]/side:w-full"
                  >
                    <div className="size-6">
                      <MenuIcon id="login" className="size-6 text-emerald-100" aria-hidden />
                    </div>
                    <span className="typography-sm sr-only @[220px]/side:not-sr-only">
                      {t('auth.login', { context: 'action' })}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Desktop>

      <div className="flex min-w-0 min-h-[100dvh] flex-1 flex-col">
        <Desktop
          fallback={
            <div className="flex items-center justify-between bg-blue-600 py-3 px-4 sm:px-6 lg:px-8">
              <div>
                <Link to="/">
                  <Wayfarer className="display-xs text-white" />
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
                >
                  <Drawer.Content width={300} height="100dvh">
                    <div className="min-h-[100dvh] flex flex-col gap-6 p-6">
                      <Drawer.Header>
                        <Drawer.Title className="text-center">Wayfarer</Drawer.Title>
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
                <div className="flex h-full w-full animate-pulse items-center justify-center text-5xl font-black text-zinc-900/5 dark:text-zinc-500/10">
                  <div>Wayfarer</div>
                </div>
              }
            >
              <>{children}</>
            </Suspense>
          </section>

          {/* Secondary column */}
          <aside className="lg:flex-shrink-0 hidden lg:block">
            <div className="bg-background-secondary relative flex h-full flex-col overflow-y-auto backdrop-blur-lg lg:w-64 2xl:w-96">
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

  if (!isAuthenticated) return null

  const [sector, system, waypoint] = agent.headquarters.split('-')

  return (
    <div>
      <div className="typography-xl text-right font-black">{agent.symbol}</div>
      <div className="typography-sm text-right">
        Credits: <span className="font-bold">{formatNumber(agent.credits)}</span>
      </div>
      <div className="typography-sm text-right">
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
      <div className="typography-sm text-right">
        Faction: <span className="font-semibold">{agent.startingFaction}</span>
      </div>
      <div className="typography-sm text-right">
        Ship Count: <span className="font-semibold">{agent.shipCount}</span>
      </div>
    </div>
  )
}
