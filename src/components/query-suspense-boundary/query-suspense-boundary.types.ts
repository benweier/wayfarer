import { FC, ReactNode } from 'react'
import { ErrorComponentProps } from '@/components/error-boundary'

export type QuerySuspenseBoundaryProps = {
  error?: ReactNode | FC<ErrorComponentProps>
  onError?: (error: Error) => void
  fallback?: ReactNode
}
