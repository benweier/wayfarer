import { RadioGroup } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import { sidebarAtom } from '@/store/atoms/sidebar'

export const Sidebar = () => {
  const { t } = useTranslation()
  const [sidebarState, setSidebarState] = useAtom(sidebarAtom)

  return (
    <RadioGroup value={sidebarState} onChange={setSidebarState} className="flex flex-col gap-4">
      <RadioGroup.Label className="typography-sm font-bold">{t('preferences.menu')}</RadioGroup.Label>
      <div className="grid grid-cols-2 gap-2">
        {[
          { key: 'preferences.collapse', value: 'collapsed', icon: 'menu:collapse' },
          { key: 'preferences.expand', value: 'expanded', icon: 'menu:expand' },
        ].map((item) => (
          <RadioGroup.Option
            key={item.value}
            value={item.value}
            className={({ checked }) => cx('btn', { 'btn-primary btn-outline': checked })}
          >
            <div className={cx('flex w-full flex-col items-center justify-between gap-1')}>
              <MenuIcon id={item.icon} className="size-5" aria-hidden />
              <RadioGroup.Label className="typography-sm font-semibold">{t(item.key)}</RadioGroup.Label>
            </div>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
