import { type LoaderFunction, json } from 'react-router-dom'
import { getState } from '@/store/auth'

export type WithAuthLoaderFunction = (loader: LoaderFunction) => LoaderFunction

export const withAuth: WithAuthLoaderFunction = (loader) => {
  const { isAuthenticated } = getState()

  if (!isAuthenticated) {
    return () =>
      json({
        redirect: { destination: `${window.location.pathname}${window.location.search}` },
      })
  }

  return loader
}
