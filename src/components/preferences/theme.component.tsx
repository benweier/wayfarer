import { RadioGroup } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import { themeAtom } from '@/store/atoms/theme'

export const Theme = () => {
  const { t } = useTranslation()
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <RadioGroup value={theme} onChange={setTheme} className="flex flex-col gap-1">
      <RadioGroup.Label className="typography-sm font-bold">{t('preferences.theme')}</RadioGroup.Label>
      <div className="grid grid-cols-3 gap-2">
        {[
          { key: 'preferences.light', value: 'light', icon: 'theme:light' },
          { key: 'preferences.dark', value: 'dark', icon: 'theme:dark' },
          { key: 'preferences.system', value: 'system', icon: 'theme:auto' },
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
