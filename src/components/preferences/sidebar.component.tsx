import { RadioGroup } from '@headlessui/react'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/20/solid'
import { useAtom } from 'jotai'
import { sidebarAtom } from '@/services/store/atoms/sidebar'
import { cx } from '@/utilities/cx'

export const Sidebar = () => {
  const [sidebarState, setSidebarState] = useAtom(sidebarAtom)

  return (
    <RadioGroup value={sidebarState} onChange={setSidebarState} className="flex flex-col gap-1">
      <RadioGroup.Label className="text-sm font-bold">Menu</RadioGroup.Label>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Collapsed', value: 'collapsed', icon: ArrowsPointingInIcon },
          { label: 'Expanded', value: 'expanded', icon: ArrowsPointingOutIcon },
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