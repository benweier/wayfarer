import { cx } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { AppIcon } from '@/components/icons'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { Wayfarer } from '@/components/wayfarer'
import { useSpaceTradersStatus } from '@/hooks/use-space-traders-status.hook'

const icon = {
  unknown: 'connection:unknown',
  online: 'connection:online',
  offline: 'connection:offline',
}
const SpaceTradersStatus = () => {
  const { t } = useTranslation()
  const { status, isChecking } = useSpaceTradersStatus()

  return (
    <>
      <span className="text-sm">Status:</span>
      <div
        className={cx({
          'text-emerald-400': status === 'online',
          'text-rose-400': status === 'offline',
          'text-yellow-400': isChecking,
        })}
      >
        <AppIcon id={icon[status]} className="size-6" aria-hidden />
      </div>
      <span className="text-sm font-semibold">{t(`general.status.${status}`)}</span>
    </>
  )
}

export const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()

  return (
    <div className="grid min-h-screen w-full auto-rows-min items-center gap-6 [grid-template-rows:auto_1fr_auto]">
      <div className="grid grid-flow-row items-center justify-center py-12">
        <Wayfarer className="text-center text-6xl font-black lg:text-7xl" />
        <div className="text-center text-xl font-semibold text-zinc-500">{t('general.description')}</div>
        <div className="grid grid-flow-col items-center justify-center gap-2 py-4">
          <QuerySuspenseBoundary
            fallback={<AppIcon id="connection:unknown" className="size-6 animate-spin text-yellow-400" aria-hidden />}
            error={<AppIcon id="connection:offline" className="size-6 text-rose-400" aria-hidden />}
          >
            <SpaceTradersStatus />
          </QuerySuspenseBoundary>
        </div>
      </div>

      <div>
        <div className="bg-zinc-200/40 dark:bg-zinc-800/40">
          <div className="mx-auto grid w-full max-w-lg items-center">
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
