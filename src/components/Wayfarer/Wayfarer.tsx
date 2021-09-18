import tw, { styled } from 'twin.macro'

export const Wayfarer = styled.div.attrs({ children: 'WAYFARER' })(() => [
  tw`text-3xl text-gray-200 leading-none font-black letter-spacing[-0.03em] font-feature-settings["kern"]`,
])
