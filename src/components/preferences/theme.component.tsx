import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import * as ToggleGroup from '@/components/toggle-group'
import { type ThemeState, themeAtom } from '@/store/atoms/theme'

export const Theme = () => {
  const { t } = useTranslation()
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <div>
      <label className="label" id="preferences.theme">
        {t('preferences.theme')}
      </label>
      <ToggleGroup.Root
        type="single"
        value={theme}
        aria-labelledby="preferences.theme"
        onValueChange={(value: ThemeState) => {
          if (value) void setTheme(value)
        }}
      >
        <ToggleGroup.Item value="light">
          <div className="typography-sm flex w-full items-center justify-between gap-2 font-semibold">
            <MenuIcon id="theme:light" className="size-4" aria-hidden />
            {t('preferences.light')}
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="dark">
          <div className="typography-sm flex w-full items-center justify-between gap-2 font-semibold">
            <MenuIcon id="theme:dark" className="size-4" aria-hidden />
            {t('preferences.dark')}
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="system">
          <div className="typography-sm flex w-full items-center justify-between gap-2 font-semibold">
            <MenuIcon id="theme:auto" className="size-4" aria-hidden />
            {t('preferences.system')}
          </div>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  )
}
