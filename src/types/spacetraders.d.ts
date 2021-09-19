export interface AllFlightsPlan {
  id: string
  createdAt: string
  arrivesAt: string
  from: string
  shipId: string
  to: string
  username: string
  shipType: string
}

export interface AvailableStructure {
  allowedLocationTypes: string[]
  consumes: Good[]
  price: number
  name: string
  produces: Good[]
  symbol: string
}

export interface Cargo {
  good: Good
  quantity: number
  totalVolume?: number
}

export interface Coordinates {
  x: number
  y: number
}

export interface FlightPlan {
  arrivesAt: string
  destination: string
  distance: number
  fuelConsumed: number
  fuelRemaining: number
  id: string
  ship: string
  terminatedAt: string
  timeRemainingInSeconds: number
}

export type Good =
  | 'CHEMICALS'
  | 'CONSTRUCTION_MATERIALS'
  | 'CONSUMER_GOODS'
  | 'ELECTROINICS'
  | 'FOOD'
  | 'FUEL'
  | 'MACHINERY'
  | 'METALS'
  | 'RESEARCH'
  | 'SHIP_PARTS'
  | 'TEXTILES'
  | 'WORKERS'

export interface Loan {
  type: LoanType
  amount: number
  collateralRequired: boolean
  rate: number
  termInDays: number
}

export type LoanType = 'STARTUP'

export interface Location extends Coordinates {
  name: string
  symbol: string
  type: string
}

export interface LocationWithMarketplace {
  marketplace: Marketplace[]
}

export interface Marketplace {
  quantityAvailable: number
  pricePerUnit: number
  volumePerUnit: number
  symbol: Good
  spread: number
  sellPricePerUnit: number
  purchasePricePerUnit: number
}

export interface Order {
  good: string
  pricePerUnit: number
  quantity: number
  total: number
}

export interface Ship {
  class: string
  dockingEfficiency: number
  fuelEfficiency: number
  maintenance: number
  manufacturer: string
  maxCargo: number
  plating: number
  purchaseLocations: Array<{
    location: string
    price: number
  }>
  speed: number
  type: string
  weapons: number
}

export interface StructureDetails {
  id: string
  type: string
  location: string
  status: string
  active: boolean
  ownedBy: {
    username?: string
    id?: string
  }
  inventory: Cargo[]
  consumes: Good[]
  produces: Good[]
}

export interface System {
  symbol: string
  name: string
  locations: Location[]
}

export interface User {
  username: string
  credits: number
  loans: YourLoan[]
  ships: YourShip[]
}

export interface YourLoan {
  due: string
  id: string
  repaymentAmount: number
  status: 'CURRENT' | 'PAID'
  type: LoanType
}

export interface YourShip {
  cargo: Cargo[]
  class: string
  id: string
  location?: string
  manufacturer: string
  maxCargo: number
  plating: number
  spaceAvailable: number
  speed: number
  type: string
  weapons: number
  x?: number
  y?: number
}

export interface AccountResponse {
  user: User
}

export interface AvailableLoanResponse {
  loans: Loan[]
}

export interface AvailableShipResponse {
  shipListings: Ship[]
}

export interface AvailableStructureResponse {
  structures: AvailableStructure[]
}

export interface CreateStructureResponse {
  structure: StructureDetails
}

export interface ErrorResponse {
  error: {
    code: number
    message: string
  }
}

export interface FlightPlanResponse {
  flightPlan: FlightPlan
}

export interface FlightPlansResponse {
  flightPlans: AllFlightsPlan[]
}

export interface JettisonResponse {
  good: Good
  quantityRemaining: number
  shipId: string
}

export interface ListStructuresResponse {
  structures: StructureDetails[]
}

export interface LocationResponse {
  dockedShips: number
  location: Location
}

export interface LocationShipsResponse {
  ships: Ship[]
}

export interface LocationsResponse {
  locations: Location[]
}

export interface MarketplaceResponse {
  marketplace: Marketplace[]
}

export interface PurchaseResponse {
  credits: number
  order: Order
  ship: YourShip
}

export type SellResponse = PurchaseResponse & { order: Order }

export interface ShipSellResponse {
  success: string
}

export interface ShipResponse {
  ships: YourShip & { flightPlanId?: string }
}

export interface ShipsResponse {
  ships: Array<YourShip & { flightPlanId?: string }>
}

export interface ShipTransferResponse {
  fromShip: YourShip
  toShip: YourShip
}

export interface SystemsResponse {
  systems: System[]
}

export interface StatusResponse {
  status: string
}

export interface StructureDepositResponse {
  deposit: Cargo
  ship: YourShip
  structure: StructureDetails
}

export interface StructureTransferResponse {
  transfer: Cargo
  ship: YourShip
  structure: StructureDetails
}

export interface TokenResponse {
  token: string
  user: User
}

export interface UserWorth {
  netWorth: number
  rank: number
  username: string
}

export interface LeaderboardResponse {
  netWorth: UserWorth[]
  userNetWorth: UserWorth
}
