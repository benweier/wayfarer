import { createElement } from 'react'
import { WithAttributes } from '@/types/components'
import { cx } from '@/utilities/cx'
import type { TypographyProps } from './types.d'

export const Typography = ({ className, tag = 'div', variant = 'body', children }: WithAttributes<TypographyProps>) => {
  return createElement(
    tag,
    {
      className: cx(
        {
          'text-hint': variant === 'hint',
          'text-caption': variant === 'caption',
          'text-body': variant === 'body',
          'text-overline': variant === 'overline',
          'text-headline': variant === 'headline',
          'text-subtitle': variant === 'subtitle',
          'text-title': variant === 'title',
          'text-hero': variant === 'hero',
        },
        className,
      ),
    },
    children,
  )
}
