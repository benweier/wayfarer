import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Await, useMatches } from 'react-router-dom'
import { isFunction } from '@/utilities/is-function'
import { hasRouteHandle } from '@/utilities/route-handle.helper'
import { type MetaProps } from './meta.types'

export const Meta = ({ titleTemplate }: MetaProps) => {
  const { t } = useTranslation()
  const matches = useMatches()
  const helmet = matches.filter(hasRouteHandle<MetaFunction>('meta', isFunction)).map((match) => {
    return (
      <Fragment key={match.id}>
        <Await resolve={match.data}>
          {(data) => {
            const metas = match.handle.meta(t, data)

            return (
              <Helmet titleTemplate={titleTemplate}>
                {metas.map((meta) => {
                  if ('title' in meta) {
                    return <title key={meta.title}>{meta.title}</title>
                  }

                  if ('name' in meta) {
                    return <meta key={`${meta.name}|${meta.content}`} name={meta.name} content={meta.content} />
                  }

                  return <Fragment key={meta} />
                })}
              </Helmet>
            )
          }}
        </Await>
      </Fragment>
    )
  })

  return <>{helmet}</>
}
