import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles, theme } from 'twin.macro'

const Styles = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: ${theme`colors.blue.500`};
    ${tw`antialiased text-base leading-none text-gray-100 bg-gray-700`}
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
