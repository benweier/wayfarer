import { FC } from 'react'
import tw from 'twin.macro'
import { Header } from 'components/Header'

export const DashboardTemplate: FC = ({ children }) => {
  return (
    <div css={tw`relative`}>
      <Header />
      {children}
    </div>
  )
}
