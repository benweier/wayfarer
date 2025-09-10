export type Meta = {
  total: number
  page: number
  limit: number
}

export type SpaceTradersResponse<R = unknown, M = never> = { data: R; meta: M }
export type SpaceTradersError<R = unknown> = {
  error?: {
    message: string
    code: number
    data: R
  }
}
