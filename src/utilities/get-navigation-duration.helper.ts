const getModeModifier = (mode: string): number => {
  switch (mode) {
    case 'CRUISE':
      return 25
    case 'DRIFT':
      return 250
    case 'BURN':
      return 7.5
    case 'STEALTH':
      return 30
    default:
      return 1
  }
}

export const getNavigationDuration = (distance: number, speed: number, mode: string): number => {
  return Math.floor(Math.round(Math.max(1, distance)) * (getModeModifier(mode) / speed) + 15)
}
