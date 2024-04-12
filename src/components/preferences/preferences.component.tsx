import * as Popover from '@radix-ui/react-popover'
import { cx } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import styles from './preferences.module.css'
import { Sidebar } from './sidebar.component'
import { Theme } from './theme.component'

export const Preferences = () => {
  const { t } = useTranslation()

  return (
    <Popover.Root>
      <Popover.Trigger className="group flex w-full items-center gap-4 overflow-hidden rounded-md py-2 px-3 font-medium text-white transition-all duration-100 hover:bg-blue-50/10 hover:shadow-sm">
        <div className="size-6 text-blue-100">
          <MenuIcon id="settings" className="size-6 group-data-[state=open]:animate-spin" aria-hidden />
        </div>
        <span className="typography-sm sr-only flex flex-col items-start justify-start @[220px]/side:not-sr-only">
          {t('preferences.label')}
        </span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          className={cx(
            styles.content,
            'bg-background-primary/80 ring-border-primary/20 relative z-50 overflow-y-auto rounded-md p-6 ring-3 backdrop-blur-lg will-change-[transform,opacity]',
          )}
          sideOffset={5}
        >
          <div className="flex flex-col gap-4">
            <Theme />
            <Sidebar />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
