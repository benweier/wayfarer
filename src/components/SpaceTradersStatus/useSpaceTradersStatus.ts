import { useStatusQuery } from 'services/spacetraders/core'

export const useSpaceTradersStatus = () => {
  return useStatusQuery(undefined, {
    refetchOnFocus: true,
    pollingInterval: 60000,
  })
}
