import { Dialog, Transition } from '@headlessui/react'
import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { atom, useAtom } from 'jotai'
import { Fragment, type PropsWithChildren, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { AppIcon, MenuIcon } from '@/components/icons'
import { Preferences } from '@/components/preferences'
import { Wayfarer } from '@/components/wayfarer'
import { Navigation } from '@/features/navigation'
import { sidebarAtom } from '@/store/atoms/sidebar'
import { useAuthStore } from '@/store/auth'
import { formatNumber } from '@/utilities/number.helper'

const menu = [
  { key: 'navigation.fleet', to: '/fleet', icon: 'fleet' },
  { key: 'navigation.systems', to: '/systems', icon: 'systems' },
] as const
const mobileMenuAtom = atom<boolean>(false)
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
      <span className="sr-only text-sm @[220px]/side:not-sr-only">{t('auth.logout', { context: 'action' })}</span>
    </Link>
  )
}

export const DashboardTemplate = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  const [sidebarState] = useAtom(sidebarAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuAtom)

  return (
    <div className="flex min-h-screen">
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/90" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-zinc-100 focus:outline-none dark:bg-zinc-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-3">
                    <button
                      type="button"
                      className="ml-1 flex size-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                    >
                      <span className="sr-only">{t('menu.close_sidebar')}</span>
                      <AppIcon id="x" className="size-5 text-white" aria-hidden />
                    </button>
                  </div>
                </Transition.Child>
                <div className="pt-6 pb-4">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <Link to="/">
                      <Wayfarer className="text-lg text-white" />
                    </Link>
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="space-y-1 px-2">
                      {menu.map((item) => (
                        <Link
                          key={item.key}
                          to={item.to}
                          className="group flex items-center rounded-md p-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 [&.active]:bg-blue-500 [&.active]:text-white"
                        >
                          <MenuIcon
                            id={item.icon}
                            className="mr-4 size-5 text-zinc-400 group-hover:text-zinc-500"
                            aria-hidden
                          />
                          {t(item.key)}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden>
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="z-10 hidden min-h-screen lg:fixed lg:flex">
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
                  <div className="text-title text-center text-white">
                    W<span className="hidden @[220px]:inline">ayfarer</span>
                  </div>
                </Link>
              </div>
              <Navigation />
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
                  <span className="sr-only text-sm @[220px]/side:not-sr-only">
                    {t('auth.login', { context: 'action' })}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile top navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-blue-600 py-2 px-4 sm:px-6 lg:px-8">
            <div>
              <Link to="/">
                <Wayfarer className="text-lg" />
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                onClick={() => {
                  setMobileMenuOpen(true)
                }}
              >
                <span className="sr-only">{t('menu.open_sidebar')}</span>
                <AppIcon id="hamburger" className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <main className="flex flex-1 overflow-hidden">
          <div
            className={cx('hidden transition-all duration-100 ease-in-out lg:block', {
              'w-20': sidebarState === 'collapsed',
              'w-56': sidebarState === 'expanded',
            })}
          />
          {/* Primary column */}
          <section className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto">
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

          {/* Secondary column (hidden on smaller screens) */}
          <aside className="lg:flex-shrink-0 hidden lg:block">
            <div className="relative flex h-full flex-col overflow-y-auto border-zinc-200 bg-zinc-100 backdrop-blur-lg lg:w-64 2xl:w-96 dark:bg-zinc-950/20">
              {isAuthenticated && (
                <div className="p-4">
                  <Agent />
                </div>
              )}
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

const Agent = () => {
  const { agent, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) return null

  const [sector, system, waypoint] = agent.headquarters.split('-')

  return (
    <div>
      <div className="text-right text-xl font-black">{agent.symbol}</div>
      <div className="text-right text-sm">
        Credits: <span className="font-bold">{formatNumber(agent.credits)}</span>
      </div>
      <div className="text-right text-sm">
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
      <div className="text-right text-sm">
        Faction: <span className="font-semibold">{agent.startingFaction}</span>
      </div>
      <div className="text-right text-sm">
        Ship Count: <span className="font-semibold">{agent.shipCount}</span>
      </div>
    </div>
  )
}
