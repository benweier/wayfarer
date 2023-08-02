import { type PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'
import { type MetaProps } from './meta.types'

export const Meta = ({ title, children }: PropsWithChildren<MetaProps>) => {
  return (
    <Helmet titleTemplate="%s | Wayfarer">
      <title>{title}</title>
      {children}
    </Helmet>
  )
}
