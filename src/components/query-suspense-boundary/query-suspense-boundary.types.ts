import type { ReactNode } from 'react'

export type QuerySuspenseBoundaryProps = {
  error?: ReactNode
  onError?: (error: Error) => void
  fallback?: ReactNode
}
