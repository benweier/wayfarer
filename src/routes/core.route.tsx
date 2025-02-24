import { HeadContent, Outlet, useRouterState } from '@tanstack/react-router'
import { lazy } from 'react'
import { Toaster } from 'sonner'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((mod) => ({
        default: () => <mod.TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />,
      })),
    )
const TanStackQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((mod) => ({
        default: () => <mod.ReactQueryDevtools initialIsOpen={false} />,
      })),
    )
const NavigationLoader = () => {
  const isLoading = useRouterState({ select: (state) => state.isLoading || state.isTransitioning })

  return isLoading && <span className="loader" />
}

export const Core = () => {
  return (
    <>
      <HeadContent />
      <NavigationLoader />
      <Outlet />
      <Toaster
        position="bottom-right"
        visibleToasts={5}
        toastOptions={{
          unstyled: true,
        }}
        duration={5000}
      />
      <TanStackRouterDevtools />
      <TanStackQueryDevtools />
    </>
  )
}
