import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import { Popover } from '@/components/popover'
import { Sidebar } from './sidebar.component'
import { Theme } from './theme.component'

export const Preferences = () => {
  const { t } = useTranslation()

  return (
    <Popover
      trigger={
        <button
          type="button"
          className="group flex w-full items-center gap-4 overflow-hidden rounded-md px-3 py-2 font-medium text-white transition-all duration-100 hover:bg-blue-50/10 hover:shadow-sm"
        >
          <div className="size-6 text-blue-100">
            <MenuIcon id="settings" className="size-6 group-data-[state=open]:animate-spin" aria-hidden />
          </div>
          <span className="text-sm sr-only @[220px]/side:not-sr-only flex flex-col items-start justify-start">
            {t('preferences.label')}
          </span>
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        <Theme />
        <Sidebar />
      </div>
    </Popover>
  )
}
