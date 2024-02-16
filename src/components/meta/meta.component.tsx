import { getRenderedMatches, useRouterState } from '@tanstack/react-router'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { type MetaProps } from './meta.types'

export const Meta = ({ titleTemplate = '%s' }: MetaProps) => {
  const { t } = useTranslation()
  const metas = useRouterState({
    select: (state) => {
      return getRenderedMatches(state).reduce<Array<{ id: string; meta: MetaObject[] }>>((metas, match) => {
        if (
          typeof match.routeContext === 'object' &&
          'meta' in match.routeContext &&
          typeof match.routeContext.meta === 'function'
        ) {
          metas.push({
            id: match.id,
            meta: match.routeContext.meta(t, match.loaderData as any),
          })
        }

        return metas
      }, [])
    },
  })

  return (
    <>
      {metas.map(({ id, meta }) => {
        return (
          <Fragment key={id}>
            {meta.map((tag) => {
              if ('title' in tag) {
                return <title key={tag.title}>{`${titleTemplate.replace(/%s/g, () => tag.title)}`}</title>
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
    </>
  )
}
