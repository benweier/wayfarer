import { Tab } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { WaypointStore } from '@/context/waypoint.context'
import { ShipCargoError, ShipCargoFallback, ShipCargoList } from '@/features/ship/cargo'
import { ShipLoadoutList } from '@/features/ship/loadout'
import { ShipSurveyExtract } from '@/features/ship/survey-extract'

export const ShipTabs = () => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab className={({ selected }) => cx('group tab', { selected })}>{t('ship.cargo')}</Tab>
        <Tab className={({ selected }) => cx('group tab', { selected })}>{t('ship.survey_extract')}</Tab>
        <Tab className={({ selected }) => cx('group tab', { selected })}>{t('ship.loadout.label')}</Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <QuerySuspenseBoundary fallback={<ShipCargoFallback />} error={<ShipCargoError />}>
            <WaypointStore systemSymbol={ship.nav.systemSymbol} waypointSymbol={ship.nav.waypointSymbol}>
              <ShipCargoList />
            </WaypointStore>
          </QuerySuspenseBoundary>
        </Tab.Panel>

        <Tab.Panel>
          <ShipSurveyExtract />
        </Tab.Panel>

        <Tab.Panel>
          <ShipLoadoutList />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
