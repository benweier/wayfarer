import { FloatingPortal } from '@floating-ui/react'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Listbox, Transition } from '@headlessui/react'
import { type Table } from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { Fragment } from 'react'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { type WaypointResponse } from '@/types/spacetraders'

export const TypeFilter = ({ table }: { table: Table<{ waypoint: WaypointResponse; presence: number }> }) => {
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
  const types = table.getColumn('type')
  const facetedValues: Map<string, number> | undefined = types?.getFacetedUniqueValues()
  const filterValues = (types?.getFilterValue() as string[] | undefined) ?? []
  const filterOptions = facetedValues === undefined ? [] : Array.from(facetedValues.keys()).sort()

  return (
    <Listbox
      as="div"
      className="relative"
      value={filterValues}
      onChange={(value) => {
        table.getColumn('type')?.setFilterValue(value)
      }}
      multiple
    >
      <Listbox.Button as={Fragment}>
        <Button intent={filterValues.length > 0 ? 'primary' : 'dim'} kind="flat" size="small" ref={refs.setReference}>
          <span className="sr-only">Filter Types</span>
          <AppIcon id="filter" className="h-4 w-4" aria-hidden="true" />
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
            {filterOptions.length > 0 && (
              <Listbox.Options className="mt-1 max-h-64 w-full overflow-auto rounded-md border-2 border-zinc-100 bg-white/90 text-sm outline-none backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
                {filterOptions.map((option) => {
                  return (
                    <Listbox.Option key={option} value={option}>
                      {({ selected, active, disabled }) => {
                        return (
                          <div className="relative p-1">
                            <span
                              className={cx(
                                'relative flex cursor-default select-none gap-2 truncate rounded py-1 pl-1 pr-10 transition-colors duration-100 ease-in-out',
                                { 'bg-zinc-900/5 dark:bg-zinc-100/10': active, 'opacity-50': disabled },
                              )}
                            >
                              <WaypointTag type={option}>{`${facetedValues?.get(option) ?? 0}`}</WaypointTag>
                              {WAYPOINT_TYPE.get(option)}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <AppIcon id="check" aria-hidden="true" className="h-4 w-4 text-emerald-500" />
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
