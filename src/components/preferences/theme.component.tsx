import { RadioGroup } from '@headlessui/react'
import { useAtom } from 'jotai'
import { MenuIcon } from '@/components/icons'
import { themeAtom } from '@/store/atoms/theme'
import { cx } from '@/utilities/cx'

export const Theme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <RadioGroup value={theme} onChange={setTheme} className="flex flex-col gap-1">
      <RadioGroup.Label className="text-sm font-bold">Theme</RadioGroup.Label>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Light', value: 'light', icon: 'theme:light' },
          { label: 'Dark', value: 'dark', icon: 'theme:dark' },
          { label: 'Auto', value: 'auto', icon: 'theme:auto' },
        ].map((item) => (
          <RadioGroup.Option
            key={item.value}
            value={item.value}
            className={({ checked }) => cx('btn', { 'btn-primary btn-outline': checked })}
          >
            <div className={cx('flex w-full flex-col items-center justify-between gap-1')}>
              <MenuIcon id={item.icon} className="h-5 w-5" aria-hidden />
              <RadioGroup.Label className="text-sm font-semibold">{item.label}</RadioGroup.Label>
            </div>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
