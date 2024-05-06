import { useRouterState } from '@tanstack/react-router'
import { Fragment, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { MetaProps } from './meta.types'

export const Meta = ({ titleTemplate = '%s' }: MetaProps) => {
  const { t } = useTranslation('meta')
  const metas = useRouterState({
    select: (state) => {
      const metas = state.matches.reduce<Map<string, ReactNode>>((metas, match) => {
        if (match.routeContext && 'meta' in match.routeContext && typeof match.routeContext.meta === 'function') {
          const meta: MetaObject[] = match.routeContext.meta(t, match.loaderData as any)

          for (const tag of meta) {
            if ('title' in tag) {
              metas.set('title', <title>{`${titleTemplate.replace(/%s/g, () => tag.title)}`}</title>)
            }

            if ('name' in tag) {
              metas.set(tag.name, <meta name={tag.name} content={tag.content} />)
            }

            if ('property' in tag) {
              metas.set(tag.property, <meta property={tag.property} content={tag.content} />)
            }
          }
        }

        return metas
      }, new Map())

      return Array.from(metas.entries())
    },
  })

  return (
    <>
      {metas.map(([key, tag]) => (
        <Fragment key={key}>{tag}</Fragment>
      ))}
    </>
  )
}
