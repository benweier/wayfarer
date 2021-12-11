import { Ship } from '@/types/spacetraders'

export type GroupByType = 'manufacturer' | 'class' | 'type'
export type SortableShipAttributes = 'maxCargo' | 'speed' | 'loadingSpeed' | 'plating' | 'weapons'
export type SortByType = 'price' | SortableShipAttributes

export const groups: Array<{ id: GroupByType; name: string }> = [
  { id: 'class', name: 'Class' },
  { id: 'manufacturer', name: 'Manufacturer' },
]

export const sorts: Array<{ id: SortByType; name: string }> = [
  { id: 'price', name: 'Price' },
  { id: 'maxCargo', name: 'Max Cargo' },
  { id: 'speed', name: 'Speed' },
  { id: 'loadingSpeed', name: 'Loading Speed' },
  { id: 'weapons', name: 'Weapons' },
  { id: 'plating', name: 'Plating' },
]

const sortByPrice = (a: Ship, b: Ship) => {
  return getPriceFrom(a, Math.min) - getPriceFrom(b, Math.max)
}

const sortByAttribute = (attr: SortableShipAttributes) => (a: Ship, b: Ship) => {
  if (a[attr] === b[attr]) {
    return getPriceFrom(a, Math.min) - getPriceFrom(b, Math.min)
  }

  return a[attr] - b[attr]
}

export const sortShips = (key: SortByType) => {
  switch (key) {
    case 'price':
      return sortByPrice

    default:
      return sortByAttribute(key)
  }
}

const getPriceFrom = (ship: Ship, getPriceFn: (...values: number[]) => number) => {
  const range = ship.purchaseLocations.map((location) => location.price)
  const price = getPriceFn(...range)

  return price
}

export const getPriceRange = (ship: Ship) => {
  const range = ship.purchaseLocations.map((location) => location.price)
  const min = Math.min(...range)
  const max = Math.max(...range)

  if (min === max) return `${min}`

  return `${min}-${max}`
}
