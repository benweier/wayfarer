import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  GlobeAltIcon,
  HomeIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { atom, useAtom } from 'jotai'
import { Fragment, Suspense } from 'react'
import { Link, NavLink, Outlet, useNavigation, useSubmit } from 'react-router-dom'
import { Preferences } from '@/components/preferences'
import { Wayfarer } from '@/components/wayfarer'
import { ROUTES } from '@/config/routes'
import { Navigation } from '@/features/Navigation'
import { sidebarAtom } from '@/services/store/atoms/sidebar'
import { useAuthStore } from '@/services/store/auth'
import { cx } from '@/utilities/cx'

const menu = [
  { name: 'Overview', href: ROUTES.OVERVIEW, icon: HomeIcon },
  // { name: 'Market', href: ROUTES.MARKET, icon: ScaleIcon },
  // { name: 'Contracts', href: ROUTES.CONTRACTS, icon: DocumentTextIcon },
  { name: 'Systems', href: ROUTES.SYSTEMS, icon: GlobeAltIcon },
  { name: 'Fleet', href: ROUTES.FLEET, icon: RocketLaunchIcon },
]

const mobileMenuAtom = atom<boolean>(false)

const NavigationLoader = () => {
  const navigation = useNavigation()

  return navigation.state !== 'idle' ? <span className="loader" /> : <></>
}

const Logout = () => {
  const submit = useSubmit()
  return (
    <button
      onClick={() => {
        submit(null, { method: 'post', action: ROUTES.LOGOUT })
      }}
      className="flex w-full items-center gap-4 rounded px-3 py-2 font-semibold text-rose-200 shadow-rose-900 transition-all duration-100 hover:scale-105 hover:bg-rose-700 hover:shadow active:scale-100 @[220px]/side:w-full"
    >
      <div className="h-6 w-6">
        <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden />
      </div>
      <span className="sr-only text-sm @[220px]/side:not-sr-only">Log out</span>
    </button>
  )
}

export const Layout = ({ children = <Outlet /> }: WithChildren) => {
  const [sidebarState] = useAtom(sidebarAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuAtom)

  return (
    <>
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
              <div className="fixed inset-0 bg-zinc-900 bg-opacity-90" />
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
                    <div className="absolute right-0 top-0 -mr-12 pt-3">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-5 w-5 text-white" aria-hidden />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="pb-4 pt-6">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Link to="/">
                        <Wayfarer className="text-lg text-white" />
                      </Link>
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {menu.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className="group flex items-center rounded-md p-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 [&.active]:bg-blue-500 [&.active]:text-white"
                          >
                            <item.icon className="mr-4 h-5 w-5 text-zinc-400 group-hover:text-zinc-500" aria-hidden />
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden>
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="z-10 hidden lg:flex lg:flex-shrink-0">
          <div
            className={cx('flex flex-col transition-all duration-100 ease-in-out @container/side', {
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
              <div className="flex flex-shrink items-center justify-center gap-2 bg-rose-600 p-4">
                <Logout />
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Mobile top navigation */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-blue-600 px-4 py-2 sm:px-6 lg:px-8">
              <div>
                <Link to="/">
                  <Wayfarer className="text-lg" />
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <main className="flex flex-1 overflow-hidden">
            {/* Primary column */}
            <section className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto">
              <NavigationLoader />
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
            <aside className="hidden lg:block lg:flex-shrink-0">
              <div className="relative flex h-full w-96 flex-col overflow-y-auto border-zinc-200 bg-zinc-100 backdrop-blur-lg dark:bg-zinc-900/50">
                <div className="p-4">
                  <Agent />
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  )
}

const Agent = () => {
  const { agent, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) return null

  const credits = new Intl.NumberFormat('en-US').format(agent.credits)

  return (
    <>
      <div className="text-xl font-black">{agent.symbol}</div>
      <div className="text-sm font-semibold">Credits: {credits}</div>
    </>
  )
}