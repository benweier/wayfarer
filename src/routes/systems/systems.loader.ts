export const meta: MetaFunction<Partial<{ page: number }>> = (t, { page } = {}) => {
  if (page === undefined) return []

  return [{ title: t('systems.title', { ns: 'meta', page }) }]
}
