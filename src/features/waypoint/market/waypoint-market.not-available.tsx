import { useTranslation } from 'react-i18next'

export const WaypointMarketNotAvailable = () => {
  const { t } = useTranslation()

  return (
    <div className="border-border-primary flex flex-col gap-4 rounded border-2 border-dashed py-9 px-3">
      <div className="typography-lg text-center">{t('market.not_available_heading')}</div>
      <div className="text-foreground-secondary text-center">{t('market.not_available_text')}</div>
    </div>
  )
}
