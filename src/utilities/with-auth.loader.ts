import { type LoaderFunction, json } from 'react-router-dom'
import { STATUS_CODES } from '@/services/http'
import { getState } from '@/store/auth'

export type WithAuthLoaderFunction = (loader: LoaderFunction) => LoaderFunction

export const withAuth: WithAuthLoaderFunction = (loader) => {
  return (...args) => {
    const { isAuthenticated } = getState()

    if (!isAuthenticated) {
      throw json(
        {
          redirect: { destination: `${window.location.pathname}${window.location.search}` },
        },
        STATUS_CODES.UNAUTHORIZED,
      )
    }

    return loader(...args)
  }
}
