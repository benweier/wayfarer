import { Fragment, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Await, useMatches } from 'react-router-dom'
import { hasRouteHandle } from '@/utilities/route-handle.helper'

function isMetaFn(fn: unknown): fn is (data: unknown) => ReactNode {
  return typeof fn === 'function'
}

export const Meta = () => {
  const matches = useMatches()
  const meta = matches.filter(hasRouteHandle('meta', isMetaFn)).map((match) => {
    return (
      <Fragment key={match.id}>
        <Await resolve={match.data}>
          {(data) => {
            return <Helmet titleTemplate="%s • Wayfarer">{match.handle.meta(data)}</Helmet>
          }}
        </Await>
      </Fragment>
    )
  })

  return <>{meta}</>
}
