import { RadioGroup } from '@headlessui/react'
import { LightBulbIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { themeAtom } from '@/store/atoms/theme'
import { cx } from '@/utilities/cx'

export const Theme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <RadioGroup value={theme} onChange={setTheme} className="flex flex-col gap-1">
      <RadioGroup.Label className="text-sm font-bold">Theme</RadioGroup.Label>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Light', value: 'light', icon: SunIcon },
          { label: 'Dark', value: 'dark', icon: MoonIcon },
          { label: 'Auto', value: 'auto', icon: LightBulbIcon },
        ].map((item) => (
          <RadioGroup.Option
            key={item.value}
            value={item.value}
            className={({ checked }) => cx('btn', { 'btn-primary btn-outline': checked })}
          >
            <div className={cx('flex w-full flex-col items-center justify-between gap-1')}>
              <item.icon className="h5 w-5" />
              <RadioGroup.Label className="text-sm font-semibold">{item.label}</RadioGroup.Label>
            </div>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
