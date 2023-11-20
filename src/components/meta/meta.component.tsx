import { Fragment, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Await, useMatches } from 'react-router-dom'
import { type MetaProps } from '@/components/meta/meta.types'
import { hasRouteHandle } from '@/utilities/route-handle.helper'

function isMetaFn(fn: unknown): fn is (data: unknown) => ReactNode {
  return typeof fn === 'function'
}

export const Meta = ({ titleTemplate }: MetaProps) => {
  const matches = useMatches()
  const meta = matches.filter(hasRouteHandle('meta', isMetaFn)).map((match) => {
    return (
      <Fragment key={match.id}>
        <Await resolve={match.data}>
          {(data) => {
            return <Helmet titleTemplate={titleTemplate}>{match.handle.meta(data)}</Helmet>
          }}
        </Await>
      </Fragment>
    )
  })

  return <>{meta}</>
}
