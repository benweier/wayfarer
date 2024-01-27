import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as ShipActions from '@/features/ship/actions'
import { ShipCooldown } from '@/features/ship/cooldown'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'

export const ShipSurveyExtract = ({ ship }: { ship: ShipResponse }) => {
  const { t } = useTranslation()
  const waypointQuery = useQuery(
    getWaypointByIdQuery({
      systemSymbol: ship.nav.systemSymbol,
      waypointSymbol: ship.nav.waypointSymbol,
    }),
  )
  const canSurveyExtract = waypointQuery.data?.data.type === 'ASTEROID'
  const canSiphon = waypointQuery.data?.data.type === 'GAS_GIANT'

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
      <div className="flex gap-2">
        <ShipActions.Survey ship={ship} disabled={!canSurveyExtract}>
          {(props) => (
            <Button intent="primary" {...props}>
              {t('ship.action.survey')} {ship.nav.waypointSymbol}
            </Button>
          )}
        </ShipActions.Survey>

        <ShipActions.Extract ship={ship} disabled={!canSurveyExtract}>
          {(props) => (
            <Button intent="confirm" {...props}>
              {t('ship.action.extract', { context: 'no_survey' })}
            </Button>
          )}
        </ShipActions.Extract>

        <ShipActions.Siphon ship={ship} disabled={!canSiphon}>
          {(props) => (
            <Button intent="warn" {...props}>
              {t('ship.action.siphon')}
            </Button>
          )}
        </ShipActions.Siphon>
      </div>
      <div className="w-full max-w-xs">
        <ShipCooldown ship={ship} />
      </div>
    </div>
  )
}
