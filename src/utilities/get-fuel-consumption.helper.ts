export const getFuelConsumption = (distance: number, mode: string): number => {
  switch (mode) {
    case 'CRUISE':
      return Math.round(distance)
    case 'DRIFT':
      return 1
    case 'BURN':
      return 2 * Math.round(distance)
    case 'STEALTH':
      return Math.round(distance)
    default:
      return distance
  }
}
