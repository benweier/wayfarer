import { type ReactNode } from 'react'

export const Skeleton = ({ label }: { label?: ReactNode }) => {
  return (
    <div>
      {label}
      <div className="select">
        <div className="select-placeholder">
          <div className="bg-background-tertiary h-2 w-1/2 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  )
}
