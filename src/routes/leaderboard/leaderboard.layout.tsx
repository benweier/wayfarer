import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { AppIcon } from '@/components/icons'
import { Wayfarer } from '@/components/wayfarer'

export const Layout = ({ children = <Outlet /> }: PropsWithChildren) => {
  const { t } = useTranslation()

  return (
    <div className="grid min-h-screen w-full items-start gap-6 [grid-template-rows:auto_1fr_auto]">
      <div className="grid grid-flow-row items-center justify-center py-12">
        <Wayfarer className="text-center text-6xl font-black lg:text-7xl" />
        <div className="text-center text-xl font-semibold text-zinc-500">{t('general.description')}</div>
      </div>

      <div>
        <div className="bg-zinc-200/40 dark:bg-zinc-700/20">
          <div className="mx-auto grid w-full max-w-3xl items-start">
            <div className="p-8">{children}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-col gap-8 py-12">
        <div className="grid grid-flow-col items-center justify-center gap-8 text-zinc-500">
          <a href="https://spacetraders.io" title="SpaceTraders" className="rounded-full p-2">
            <AppIcon id="rocket" className="size-8" />
          </a>
          <a href="https://github.com/benweier/wayfarer" title="GitHub" className="rounded-full p-2">
            <AppIcon id="github" className="size-8" />
          </a>
        </div>
      </div>
    </div>
  )
}
