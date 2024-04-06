import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Popover, Transition } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import { Sidebar } from './sidebar.component'
import { Theme } from './theme.component'

export const Preferences = () => {
  const { t } = useTranslation()
  const { x, y, refs } = useFloating<HTMLButtonElement>({
    strategy: 'absolute',
    placement: 'top-start',
    middleware: [offset(8), shift({ padding: 4 })],
    whileElementsMounted: (reference, floating, update) => {
      return autoUpdate(reference, floating, update, {
        animationFrame: true,
      })
    },
  })

  return (
    <Popover className="relative w-full">
      {({ open }) => (
        <>
          <Popover.Button
            ref={refs.setReference}
            className="flex w-full items-center gap-4 overflow-hidden rounded-md py-2 px-3 font-medium text-white transition-all duration-100 hover:bg-blue-50/10 hover:shadow-sm"
          >
            <div className="size-6 text-blue-100">
              <MenuIcon id="settings" className={cx('size-6', { 'animate-spin': open })} aria-hidden />
            </div>
            <span className="typography-sm sr-only flex flex-col items-start justify-start @[220px]/side:not-sr-only">
              {t('preferences.label')}
            </span>
          </Popover.Button>
          <div
            ref={refs.setFloating}
            className="absolute top-0 left-0 w-max"
            style={{
              transform: `translate(${Math.round(x)}px,${Math.round(y)}px)`,
            }}
          >
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Popover.Panel className="bg-background-primary/80 ring-border-primary/20 relative z-50 origin-bottom-left overflow-y-auto rounded-lg p-5 ring-3 backdrop-blur-lg">
                <div className="flex flex-col gap-4">
                  <Theme />
                  <Sidebar />
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  )
}
