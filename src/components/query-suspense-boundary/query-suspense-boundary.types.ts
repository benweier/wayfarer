import { type FC, type ReactNode } from 'react'
import { type ErrorComponentProps } from '@/components/error-boundary'

export type QuerySuspenseBoundaryProps = {
  error?: FC<ErrorComponentProps>
  onError?: (error: Error) => void
  fallback?: ReactNode
}
