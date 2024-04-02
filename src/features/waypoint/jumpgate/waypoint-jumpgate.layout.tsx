import { type ReactNode } from 'react'

export const WaypointJumpGateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="space-y-4">
      <div className="typography-xl text-center">Connected Systems</div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">{children}</div>
    </div>
  )
}
