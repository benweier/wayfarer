import { Helmet } from 'react-helmet-async'

export const Meta = ({ title, children }: WithChildren<{ title: string }>) => {
  return (
    <Helmet titleTemplate="%s | Wayfarer">
      <title>{title}</title>
      {children}
    </Helmet>
  )
}
