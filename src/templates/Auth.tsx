import { FC } from 'react'
import { IconContext } from 'react-icons'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { VscRocket, VscGithub } from 'react-icons/vsc'
import tw, { theme } from 'twin.macro'
import { SpaceTradersStatus, useSpaceTradersStatus } from '@/components/SpaceTradersStatus'
import { Wayfarer } from '@/components/Wayfarer'

const Status = () => {
  const { status } = useSpaceTradersStatus()

  return (
    <>
      <SpaceTradersStatus />
      <span css={tw`text-sm`}>{status}</span>
    </>
  )
}

export const AuthTemplate: FC = ({ children }) => {
  return (
    <div css={tw`min-h-screen w-full px-4 py-4 grid gap-6 auto-rows-min grid-template-rows[auto 1fr auto]`}>
      <div css={tw`grid grid-flow-row justify-center items-center py-8`}>
        <div css={tw`place-self-center`}>
          <GiNorthStarShuriken size={64} />
        </div>
        <Wayfarer css={tw`text-center text-6xl lg:text-7xl`} />
        <div css={tw`text-center text-xl font-semibold text-gray-400`}>A SpaceTraders API Interface</div>
        <div css={tw`grid grid-flow-col gap-2 items-center justify-center py-4`}>
          <Status />
        </div>
      </div>

      {children}

      <div css={tw`grid grid-flow-col gap-8 py-16`}>
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
