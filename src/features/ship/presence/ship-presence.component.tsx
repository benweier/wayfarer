import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

export const ShipPresence = ({
  label,
  count,
  symbol,
  children,
}: PropsWithChildren<{ label: string; count: number; symbol: string }>) => {
  const { t } = useTranslation()

  return <span title={t(label, { count, symbol })}>{children}</span>
}
