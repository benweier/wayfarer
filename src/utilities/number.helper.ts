export const formatNumber = (value: number, lng?: string): string => {
  const formatter = new Intl.NumberFormat(lng)

  return formatter.format(value)
}
