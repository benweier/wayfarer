import { Tab } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { ShipCargoError, ShipCargoFallback, ShipCargoList } from '@/features/ship/cargo'
import { ShipLoadoutList } from '@/features/ship/loadout'
import { ShipResources } from '@/features/ship/resourecs'
import * as SurveyActions from '@/features/survey/actions'
import { SurveyContext } from '@/features/survey/context'
import { SurveyList } from '@/features/survey/list'

export const ShipTabs = () => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab className="group tab">{t('ship.cargo')}</Tab>
        <Tab className="group tab">{t('ship.resources')}</Tab>
        <Tab className="group tab">{t('ship.loadout.label')}</Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <QuerySuspenseBoundary fallback={<ShipCargoFallback />} error={<ShipCargoError />}>
            <ShipCargoList />
          </QuerySuspenseBoundary>
        </Tab.Panel>

        <Tab.Panel>
          <div className="space-y-4">
            <ShipResources ship={ship} />
            <SurveyContext.Provider
              value={{
                Extract: SurveyActions.Extract,
                Discard: SurveyActions.Discard,
              }}
            >
              <SurveyList
                predicate={(survey) => {
                  return survey.symbol === ship.nav.waypointSymbol
                }}
              />
            </SurveyContext.Provider>
          </div>
        </Tab.Panel>

        <Tab.Panel>
          <ShipLoadoutList />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
