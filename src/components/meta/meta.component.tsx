import { useRouterState } from '@tanstack/react-router'
import { Fragment, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export const Meta = () => {
  const { t } = useTranslation('meta')
  const metas = useRouterState({
    select: (state) => {
      const metas = state.matches.reduce<Map<string, ReactNode>>((metas, match) => {
        if (!('meta' in match.context)) {
          return metas
        }

        const meta = match.context.meta(t, match.loaderData)

        for (const tag of meta) {
          if ('title' in tag) {
            metas.set(
              'title',
              <title>{`${t('title_template', { title: tag.title, ns: 'meta', defaultValue: tag.title })}`}</title>,
            )
          }

          if ('name' in tag) {
            metas.set(tag.name, <meta name={tag.name} content={tag.content} />)
          }

          if ('property' in tag) {
            metas.set(tag.property, <meta property={tag.property} content={tag.content} />)
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
