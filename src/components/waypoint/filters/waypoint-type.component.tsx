import { FloatingPortal } from '@floating-ui/react'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Listbox, Transition } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { WaypointTag } from '@/components/waypoint/tag'

export const WaypointTypeFilter = ({
  values = [],
  facets = new Map(),
  onChange,
}: {
  values?: string[]
  facets?: Map<string, number>
  onChange: (value: string[]) => void
}) => {
  const { t } = useTranslation()
  const { x, y, refs } = useFloating<HTMLButtonElement>({
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [offset(8), shift({ padding: 4 })],
    whileElementsMounted: (reference, floating, update) => {
      return autoUpdate(reference, floating, update, {
        animationFrame: true,
      })
    },
  })
  const options = Array.from(facets.keys()).toSorted()

  return (
    <Listbox
      as="div"
      className="relative"
      value={values}
      onChange={(value) => {
        onChange(value)
      }}
      multiple
    >
      <Listbox.Button as={Fragment}>
        <Button intent={values.length > 0 ? 'info' : 'neutral'} kind="outline" icon ref={refs.setReference}>
          <span className="sr-only">Filter Types</span>
          <AppIcon id="filter" className="size-4" aria-hidden="true" />
        </Button>
      </Listbox.Button>

      <FloatingPortal>
        <div
          ref={refs.setFloating}
          className="absolute top-0 z-10 w-max"
          style={{
            transform: `translate(${Math.round(x)}px,${Math.round(y)}px)`,
          }}
        >
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {options.length > 0 && (
              <Listbox.Options className="border-border-primary bg-background-primary/90 typography-sm mt-1 max-h-64 w-full overflow-auto rounded-md border-2 outline-none backdrop-blur-md">
                {options.map((option) => {
                  return (
                    <Listbox.Option key={option} value={option}>
                      {({ selected, active, disabled }) => {
                        return (
                          <div className="relative p-1">
                            <span
                              className={cx(
                                'relative flex cursor-default gap-2 truncate rounded py-1 pr-10 pl-1 transition-colors duration-100 ease-in-out select-none',
                                { 'bg-background-tertiary': active, 'opacity-50': disabled },
                              )}
                            >
                              <WaypointTag type={option}>{`${facets.get(option) ?? 0}`}</WaypointTag>
                              {t(option, { ns: 'spacetraders.waypoint_type' })}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <AppIcon
                                  id="check"
                                  aria-hidden="true"
                                  className="text-foreground-success-secondary size-4"
                                />
                              </span>
                            )}
                          </div>
                        )
                      }}
                    </Listbox.Option>
                  )
                })}
              </Listbox.Options>
            )}
          </Transition>
        </div>
      </FloatingPortal>
    </Listbox>
  )
}
