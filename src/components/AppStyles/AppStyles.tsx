import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles } from 'twin.macro'

const Styles = createGlobalStyle`
  body {
    ${tw`antialiased relative text-base text-gray-100 bg-gray-800`}
  }
`

export const AppStyles = () => {
  return (
    <>
      <GlobalStyles />
      <Styles />
    </>
  )
}
