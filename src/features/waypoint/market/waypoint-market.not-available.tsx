import { useTranslation } from 'react-i18next'

export const WaypointMarketNotAvailable = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 py-9 px-3 dark:border-zinc-600">
      <div className="text-headline text-center">{t('market.not_available_heading')}</div>
      <div className="text-secondary text-center">{t('market.not_available_text')}</div>
    </div>
  )
}
