import { styled } from 'twin.macro'
import {
  heightStyles,
  marginStyles,
  mxStyles,
  myStyles,
  paddingStyles,
  pxStyles,
  pyStyles,
  widthStyles,
} from './box.styles'

export const Box = styled.div<{
  p?: keyof typeof paddingStyles
  px?: keyof typeof pxStyles
  py?: keyof typeof pyStyles
  m?: keyof typeof marginStyles
  mx?: keyof typeof mxStyles
  my?: keyof typeof myStyles
  h?: keyof typeof heightStyles
  w?: keyof typeof widthStyles
}>(({ p, px, py, m, mx, my, h, w }) => [
  p && paddingStyles[p],
  px && pxStyles[px],
  py && pyStyles[py],
  m && marginStyles[m],
  mx && mxStyles[mx],
  my && myStyles[my],
  h && heightStyles[h],
  w && widthStyles[w],
])
