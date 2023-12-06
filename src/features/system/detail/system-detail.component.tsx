import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { SystemTag } from '@/components/system/tag'
import { useSystemResponse } from '@/context/system.context'

export const SystemDetail = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const system = useSystemResponse()

  return (
    <div key={system.symbol} className="grid gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2">
          <SystemTag type={system.type}>{t(system.type, { ns: 'spacetraders.system_type' })}</SystemTag>
          <div className="text-sm font-light">
            ({system.x}, {system.y})
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
