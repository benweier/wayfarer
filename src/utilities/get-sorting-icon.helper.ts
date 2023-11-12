export const getSortingIcon = (sort: false | 'asc' | 'desc', type?: 'alpha' | 'numeric') => {
  if (sort === false) {
    return 'arrow:up-down'
  }

  if (type === undefined) {
    return sort === 'asc' ? 'arrow:up' : 'arrow:down'
  }

  return sort === 'asc' ? `arrow:up:${type}` : `arrow:down:${type}`
}
