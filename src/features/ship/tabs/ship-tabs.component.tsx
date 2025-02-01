import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Tabs from '@/components/tabs'
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
    <Tabs.Root defaultValue="cargo">
      <Tabs.List>
        <Tabs.Trigger value="cargo">{t('ship.cargo')}</Tabs.Trigger>
        <Tabs.Trigger value="resources">{t('ship.resources')}</Tabs.Trigger>
        <Tabs.Trigger value="loadout">{t('ship.loadout.label')}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="cargo">
        <QuerySuspenseBoundary fallback={<ShipCargoFallback />} error={<ShipCargoError />}>
          <ShipCargoList />
        </QuerySuspenseBoundary>
      </Tabs.Content>

      <Tabs.Content value="resources">
        <div className="space-y-4">
          <ShipResources ship={ship} />
          <SurveyContext value={SurveyActions}>
            <SurveyList
              predicate={(survey) => {
                return survey.symbol === ship.nav.waypointSymbol
              }}
            />
          </SurveyContext>
        </div>
      </Tabs.Content>

      <Tabs.Content value="loadout">
        <ShipLoadoutList />
      </Tabs.Content>
    </Tabs.Root>
  )
}
