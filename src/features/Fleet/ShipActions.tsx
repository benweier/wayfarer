import { useMutation } from '@tanstack/react-query'
import { createShipOrbit, createShipScanWaypoint } from '@/services/api/spacetraders'

export const Orbit = ({ ship }: { ship: string }) => {
  const { mutate, data } = useMutation({
    mutationKey: ['ship-orbit', ship],
    mutationFn: (id: string) => createShipOrbit({ path: id }),
  })

  return (
    <button
      onClick={() => {
        mutate(ship)
      }}
    >
      Orbit
    </button>
  )
}

export const ScanWaypoints = ({ ship }: { ship: string }) => {
  const { mutate, data } = useMutation({
    mutationKey: ['ship-scan-waypoints', ship],
    mutationFn: (id: string) => createShipScanWaypoint({ path: id }),
  })

  return (
    <button
      onClick={() => {
        mutate(ship)
      }}
    >
      Scan
    </button>
  )
}
