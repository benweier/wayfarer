import { MenuIcon } from '@/components/icons'
import { Popover } from '@/components/popover'
import { useTranslation } from 'react-i18next'
import { Sidebar } from './sidebar.component'
import { Theme } from './theme.component'

export const Preferences = () => {
  const { t } = useTranslation()

  return (
    <Popover
      trigger={
        <button
          type="button"
          className="group flex w-full items-center gap-4 overflow-hidden rounded-md py-2 px-3 font-medium text-white transition-all duration-100 hover:bg-blue-50/10 hover:shadow-sm"
        >
          <div className="size-6 text-blue-100">
            <MenuIcon id="settings" className="size-6 group-data-[state=open]:animate-spin" aria-hidden />
          </div>
          <span className="typography-sm sr-only flex flex-col items-start justify-start @[220px]/side:not-sr-only">
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
