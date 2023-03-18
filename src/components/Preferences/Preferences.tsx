import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Popover, Transition } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { cx } from '@/utilities/cx'
import { Sidebar } from './Sidebar'
import { Theme } from './Theme'

export const Preferences = () => {
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
            className="flex w-full items-center gap-4 overflow-hidden rounded-md px-3 py-2 font-semibold text-blue-200 transition-all duration-100 hover:bg-blue-50/10 hover:shadow-sm"
          >
            <div className="h-6 w-6">
              <Cog6ToothIcon className={cx('h-6 w-6', { 'animate-spin': open })} aria-hidden />
            </div>
            <span className="sr-only flex flex-col items-start justify-start text-sm leading-none @[220px]/side:not-sr-only">
              Preferences
            </span>
          </Popover.Button>
          <div
            ref={refs.setFloating}
            className="absolute top-0 left-0 w-max"
            style={{
              transform:
                typeof x === 'number' && typeof y === 'number'
                  ? `translate(${Math.round(x)}px,${Math.round(y)}px)`
                  : undefined,
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
              <Popover.Panel className="relative z-50 w-screen max-w-xs origin-bottom-left overflow-y-auto rounded-lg bg-zinc-100/75 p-4 ring ring-black/5 backdrop-blur-lg dark:bg-zinc-900/75 dark:ring-white/5">
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
