import { useTranslation } from 'react-i18next'

export const WaypointMarketNotAvailable = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 rounded border-2 border-border-primary border-dashed px-3 py-9">
      <div className="text-lg text-center">{t('market.not_available_heading')}</div>
      <div className="text-center text-foreground-secondary">{t('market.not_available_text')}</div>
    </div>
  )
}
