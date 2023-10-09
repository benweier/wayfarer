import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getRequestPagination } from '@/utilities/get-request-pagination.helper'

export const usePagination = () => {
  const [params, setParams] = useSearchParams()
  const { page, limit } = getRequestPagination(params)

  return {
    page,
    limit,
    setPage: useCallback(
      (page: number) => {
        setParams({ page })
      },
      [setParams],
    ),
  }
}
