import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

const getPageNumber = (page: string | null) => {
  const pageNumber = parseInt(page ?? '1')

  return Number.isNaN(pageNumber) ? 1 : Math.max(1, pageNumber)
}

export const usePagination = () => {
  const [params, setParams] = useSearchParams({ page: '1' })
  const page = getPageNumber(params.get('page'))

  return {
    page,
    limit: 20,
    setPage: useCallback(
      (page: number) => {
        setParams({ page: page.toString() })
      },
      [setParams],
    ),
  }
}
