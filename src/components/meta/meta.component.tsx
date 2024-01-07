import { useRouterState } from '@tanstack/react-router'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { type MetaProps } from './meta.types'

export const Meta = ({ titleTemplate }: MetaProps) => {
  const routerState = useRouterState()
  const { t } = useTranslation()
  const matches = [...routerState.matches]
    .filter((match) => typeof match.routeContext.meta === 'function')
    .map((match) => {
      return {
        id: match.id,
        meta: match.loaderData === undefined ? [] : (match.routeContext.meta(t, match.loaderData) as MetaObject[]),
      }
    })

  return (
    <Helmet titleTemplate={titleTemplate}>
      {matches.map(({ id, meta }) => {
        return (
          <Fragment key={id}>
            {meta.map((tag) => {
              if ('title' in tag) {
                return <title key={tag.title}>{tag.title}</title>
              }

              if ('name' in tag) {
                return <meta key={`${tag.name}|${tag.content}`} name={tag.name} content={tag.content} />
              }

              if ('property' in tag) {
                return <meta key={`${tag.property}|${tag.content}`} property={tag.property} content={tag.content} />
              }

              return <Fragment key={tag} />
            })}
          </Fragment>
        )
      })}
    </Helmet>
  )
}
