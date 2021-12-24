import tw, { styled } from 'twin.macro'
import { alignStyles, columnStyles, justifyStyles, rowStyles, spacingStyles } from './grid.styles'

export const Grid = styled.div<{
  variant?: 'grid' | 'flex'
  cols?: keyof typeof columnStyles
  rows?: keyof typeof rowStyles
  justify?: keyof typeof justifyStyles
  align?: keyof typeof alignStyles
  gap?: keyof typeof spacingStyles
}>(({ variant = 'grid', cols, rows, justify, align, gap }) => [
  variant === 'grid' && tw`grid`,
  variant === 'flex' && tw`flex`,
  cols && columnStyles[cols],
  rows && rowStyles[rows],
  justify && justifyStyles[justify],
  align && alignStyles[align],
  gap && spacingStyles[gap],
])
