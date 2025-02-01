import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import * as ToggleGroup from '@/components/toggle-group'
import { sidebarAtom } from '@/store/atoms/sidebar'
import type { SidebarState } from '@/store/atoms/sidebar'

export const Sidebar = () => {
  const { t } = useTranslation()
  const [sidebarState, setSidebarState] = useAtom(sidebarAtom)

  return (
    <div>
      <label className="label" id="preferences.sidebar">
        {t('preferences.menu')}
      </label>
      <ToggleGroup.Root
        type="single"
        value={sidebarState}
        aria-labelledby="preferences.sidebar"
        onValueChange={(value: SidebarState) => {
          if (value) void setSidebarState(value)
        }}
      >
        <ToggleGroup.Item value="collapsed">
          <div className="text-sm flex w-full items-center justify-between gap-2 font-semibold">
            <MenuIcon id="menu:collapse" className="size-4" aria-hidden />
            {t('preferences.collapse')}
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="expanded">
          <div className="text-sm flex w-full items-center justify-between gap-2 font-semibold">
            <MenuIcon id="menu:expand" className="size-4" aria-hidden />
            {t('preferences.expand')}
          </div>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  )
}
