import { i18n } from '@/services/i18n'

export const getSortingLabel = (id: string, sorted: false | 'asc' | 'desc') => {
  return i18n.t(`general.sorting.sort_by_property`, { context: sorted || 'reset', id })
}
