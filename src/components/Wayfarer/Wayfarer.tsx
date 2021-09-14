import tw, { styled } from 'twin.macro'

export const Wayfarer = styled.div.attrs({ children: 'WAYFARER' })(() => [
  tw`text-3xl leading-none font-wayfarer font-normal letter-spacing[-0.03em] font-feature-settings["kern"]`,
])
