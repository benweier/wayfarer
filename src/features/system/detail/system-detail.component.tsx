import { useSystemResponse } from '@/context/system.context'
import { SystemTag } from '@/features/system/tag'
import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

export const SystemDetail = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation('spacetraders.system_type')
  const system = useSystemResponse()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start gap-x-4">
        <SystemTag type={system.type}>{t(system.type)}</SystemTag>
        <div className="typography-sm font-light">
          ({system.x}, {system.y})
        </div>
      </div>

      <div>{children}</div>
    </div>
  )
}
