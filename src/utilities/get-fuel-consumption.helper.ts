export const getFuelConsumption = (distance: number, mode: string): number => {
  switch (mode) {
    case 'CRUISE':
      return Math.max(1, Math.round(distance))
    case 'DRIFT':
      return 1
    case 'BURN':
      return Math.max(1, 2 * Math.round(distance))
    case 'STEALTH':
      return Math.max(1, Math.round(distance))
    default:
      return distance
  }
}
