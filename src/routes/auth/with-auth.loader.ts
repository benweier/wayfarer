import { type LoaderFunction, json } from 'react-router-dom'
import { STATUS_CODES } from '@/services/http'
import { getAuthState } from '@/store/auth'

export type WithAuthLoaderFunction = (loader: LoaderFunction) => LoaderFunction

export const withAuth: WithAuthLoaderFunction = (loader) => {
  return (args) => {
    const { isAuthenticated } = getAuthState()

    if (!isAuthenticated) {
      const url = new URL(args.request.url)

      throw json(
        {
          redirect: { destination: `${url.pathname}${url.search}` },
        },
        STATUS_CODES.UNAUTHORIZED,
      )
    }

    return loader(args)
  }
}
