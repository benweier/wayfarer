import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import * as MultiSelect from '@/components/multi-select'
import { WaypointTag } from '@/components/waypoint/tag'

export const WaypointTypeFilter = ({
  value = [],
  facets = new Map(),
  onChange,
}: {
  value?: string[]
  facets?: Map<string, number>
  onChange: (value: string[]) => void
}) => {
  const { t } = useTranslation()
  const options = Array.from(facets.keys()).toSorted((a, b) => a.localeCompare(b))

  return (
    <>
      <MultiSelect.Field
        trigger={
          <Button intent={value.length > 0 ? 'info' : 'neutral'} kind="outline" icon>
            <span className="sr-only">Filter Types</span>
            <AppIcon id="filter" className="size-4" aria-hidden="true" />
          </Button>
        }
        value={value}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <MultiSelect.Item key={option} value={option}>
              <div className="flex gap-2">
                <WaypointTag type={option}>{`${facets.get(option) ?? 0}`}</WaypointTag>
                {t(option, { ns: 'spacetraders.waypoint_type' })}
              </div>
            </MultiSelect.Item>
          )
        })}
      </MultiSelect.Field>
    </>
  )
}
