const PAGE_MIN = 1
const LIMIT_MIN = 1
const LIMIT_MAX = 20

export const getRequestPagination = (params: URLSearchParams) => {
  const page = parseInt(params.get('page') ?? PAGE_MIN)
  const limit = parseInt(params.get('limit') ?? LIMIT_MAX)

  return {
    page: Number.isNaN(page) ? PAGE_MIN : Math.max(PAGE_MIN, page),
    limit: Number.isNaN(limit) ? LIMIT_MAX : Math.max(LIMIT_MIN, Math.min(limit, LIMIT_MAX)),
  }
}
