import { ReactNode } from 'react'

export const WaypointJumpGateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid gap-4">
      <div className="text-headline text-center">Connected Systems</div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">{children}</div>
    </div>
  )
}
