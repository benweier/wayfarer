import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useMatches } from 'react-router-dom'
import { isFunction } from '@/utilities/is-function'
import { hasRouteHandle } from '@/utilities/route-handle.helper'
import { type MetaProps } from './meta.types'

export const Meta = ({ titleTemplate }: MetaProps) => {
  const { t } = useTranslation()
  const matches = useMatches()
  const handlers = matches.filter(hasRouteHandle<MetaFunction>('meta', isFunction))

  if (handlers.length === 0) return null

  return (
    <Helmet titleTemplate={titleTemplate}>
      {handlers.map((match) => {
        const metas = match.handle.meta(t, match.data)

        return (
          <Fragment key={match.id}>
            {metas.map((meta) => {
              if ('title' in meta) {
                return <title key={meta.title}>{meta.title}</title>
              }

              if ('name' in meta) {
                return <meta key={`${meta.name}|${meta.content}`} name={meta.name} content={meta.content} />
              }

              return <Fragment key={meta} />
            })}
          </Fragment>
        )
      })}
    </Helmet>
  )
}
