import tw, { styled } from 'twin.macro'
import { alignStyles, lineHeightStyles, sizeStyles, weightStyles } from './typography.styles'

export const Typography = styled.div<{
  size?: keyof typeof sizeStyles
  weight?: keyof typeof weightStyles
  align?: keyof typeof alignStyles
  leading?: keyof typeof lineHeightStyles
  italic?: boolean
  underline?: boolean
  nowrap?: boolean
  truncate?: boolean
}>(({ size, weight, align, leading, italic, underline, nowrap, truncate }) => [
  size && sizeStyles[size],
  weight && weightStyles[weight],
  align && alignStyles[align],
  leading && lineHeightStyles[leading],
  italic && tw`italic`,
  underline && tw`underline`,
  nowrap && tw`whitespace-nowrap`,
  truncate && tw`truncate`,
])
