const PAGE_MIN = 1
const LIMIT_MIN = 1
const LIMIT_MAX = 20

export const getRequestPagination = (params: URLSearchParams) => {
  const page = Number.parseInt(params.get('page') ?? PAGE_MIN.toString())
  const limit = Number.parseInt(params.get('limit') ?? LIMIT_MAX.toString())

  return {
    page: Number.isNaN(page) ? PAGE_MIN : Math.max(PAGE_MIN, page),
    limit: Number.isNaN(limit) ? LIMIT_MAX : Math.max(LIMIT_MIN, Math.min(limit, LIMIT_MAX)),
  }
}
