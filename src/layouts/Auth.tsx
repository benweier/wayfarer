import { ReactNode } from 'react'
import { IconContext } from 'react-icons'
import { VscRocket, VscGithub } from 'react-icons/vsc'
import tw, { theme } from 'twin.macro'
import { Wayfarer } from 'components/Wayfarer'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div css={tw`min-h-screen w-full px-4 py-4 grid gap-6 auto-rows-min grid-template-rows[auto 1fr auto]`}>
      <div css={tw`grid justify-center items-center py-8`}>
        <Wayfarer css={tw`text-center text-6xl lg:text-7xl`} />
        <div css={tw`text-center text-xl font-semibold text-gray-400`}>A SpaceTraders API Interface</div>
      </div>
      <div css={tw`mx-auto max-w-lg w-full grid items-center`}>{children}</div>
      <div css={tw`grid grid-flow-col gap-8 py-8`}>
        <div css={tw`grid grid-flow-col gap-8 items-center justify-center`}>
          <IconContext.Provider value={{ size: '32', color: theme`colors.gray.400` }}>
            <a href="https://spacetraders.io" title="SpaceTraders">
              <VscRocket />
            </a>
            <a href="https://github.com/benweier/wayfarer" title="GitHub">
              <VscGithub />
            </a>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}
