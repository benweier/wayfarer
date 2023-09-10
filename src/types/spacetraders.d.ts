type StatusResponse = {
  status: string
  version: string
  resetDate: string
  description: string
  stats: { agents: number; ships: number; systems: number; waypoints: number }
  leaderboards: {
    mostCredits: Array<{ agentSymbol: string; credits: number }>
    mostSubmittedCharts: Array<{ agentSymbol: string; chartCount: number }>
  }
  serverResets: { next: string; frequency: string }
  announcements: Array<{
    title: string
    body: string
  }>
  links: Array<{ name: string; url: string }>
}

export type AgentResponse = {
  accountId: string
  symbol: string
  headquarters: string
  credits: number
}

export type ContractDelivery = {
  tradeSymbol: string
  destinationSymbol: string
  unitsRequired: number
  unitsFulfilled: number
}

export type ContractTerm = {
  deadline: string
  payment: {
    onAccepted: number
    onFulfilled: number
  }
  deliver: ContractDelivery[]
}

export type ContractResponse = {
  id: string
  factionSymbol: string
  type: string
  terms: ContractTerm
  accepted: boolean
  fulfilled: boolean
  expiration: string
  deadlineToAccept: string
}

export type FactionResponse = {
  symbol: string
  name: string
  description: string
  headquarters: string
  traits: Array<{
    symbol: string
    name: string
    description: string
  }>
}

export type FuelResponse = {
  current: number
  capacity: number
  consumed: {
    amount: number
    timestamp: string
  }
}

export type NavigationRoute = {
  departure: {
    symbol: string
    type: string
    systemSymbol: string
    x: number
    y: number
  }
  destination: {
    symbol: string
    type: string
    systemSymbol: string
    x: number
    y: number
  }
  arrival: string
  departureTime: string
}

export type NavigationResponse = {
  systemSymbol: string
  waypointSymbol: string
  route: NavigationRoute
  status: string
  flightMode: string
}

export type ShipCrew = {
  current: number
  capacity: number
  required: number
  rotation: string
  morale: number
  wages: number
}

export type ShipFuel = {
  current: number
  capacity: number
  consumed: {
    amount: number
    timestamp: string
  }
}

export type ShipFrame = {
  symbol: string
  name: string
  description: string
  moduleSlots: number
  mountingPoints: number
  fuelCapacity: number
  condition: number
  requirements: {
    power: number
    crew: number
  }
}

export type ShipReactor = {
  symbol: string
  name: string
  description: string
  condition: number
  powerOutput: number
  requirements: {
    crew: number
  }
}

export type ShipEngine = {
  symbol: string
  name: string
  description: string
  condition: number
  speed: number
  requirements: {
    power: number
    crew: number
  }
}

export type ShipModule = {
  symbol: string
  name: string
  description: string
  capacity?: number
  range?: number
  requirements: {
    crew: number
    power: number
    slots: number
  }
}

export type ShipMount = {
  symbol: string
  name: string
  description: string
  strength?: number
  deposits: string[]
  requirements: {
    power: number
    crew: number
    slots?: number
  }
}

export type ShipRegistration = {
  name: string
  factionSymbol: string
  role: string
}

export type CargoInventory = {
  symbol: string
  name: string
  description: string
  units: number
}

export type ShipCargo = {
  capacity: number
  units: number
  inventory: CargoInventory[]
}

export type ShipResponse = {
  symbol: string
  nav: NavigationResponse
  crew: ShipCrew
  fuel: ShipFuel
  frame: ShipFrame
  reactor: ShipReactor
  engine: ShipEngine
  modules: ShipModule[]
  mounts: ShipMount[]
  registration: ShipRegistration
  cargo: ShipCargo
}

export type SystemWaypoint = {
  symbol: string
  type: string
  x: number
  y: number
}

export type SystemFaction = { symbol: string }

export type SystemsResponse = {
  symbol: string
  sectorSymbol: string
  type: string
  x: number
  y: number
  waypoints: SystemWaypoint[]
  factions: SystemFaction[]
}

export type ChartResponse = {
  waypointSymbol: string
  submittedBy: string
  submittedOn: string
}

export type WaypointOrbital = {
  symbol: string
}

export type WaypointFaction = {
  symbol: string
}

export type WaypointTrait = {
  symbol: string
  name: string
  description: string
}

export type WaypointResponse = {
  symbol: string
  type: string
  systemSymbol: string
  x: number
  y: number
  orbitals: WaypointOrbital[]
  faction: WaypointFaction
  traits: WaypointTrait[]
  chart: ChartResponse
}

export type MarketGood = {
  symbol: string
  name: string
  description: string
}

export type MarketTradeGood = {
  symbol: string
  tradeVolume: number
  supply: string
  purchasePrice: number
  sellPrice: number
}

export type MarketTransaction = {
  shipSymbol: string
  tradeSymbol: string
  type: string
  units: number
  pricePerUnit: number
  totalPrice: number
  timestamp: string
}

export type MarketResponse = {
  symbol: string
  exports: MarketGood[]
  imports: MarketGood[]
  exchange: MarketGood[]
  transactions: MarketTransaction[]
  tradeGoods?: MarketTradeGood[]
}

export type JumpGateConnectedSystem = {
  symbol: string
  sectorSymbol: string
  type: string
  factionSymbol: string
  x: number
  y: number
  distance: number
}

export type JumpGateResponse = {
  jumpRange: number
  factionSymbol: string
  connectedSystems: JumpGateConnectedSystem[]
}

export type ShipyardShip = {
  type: string
  name: string
  description: string
  purchasePrice: number
  frame: {
    symbol: string
    name: string
    description: string
    condition: number
    moduleSlots: number
    mountingPoints: number
    fuelCapacity: number
    requirements: {
      power: number
      crew: number
      slots: number
    }
  }
  reactor: {
    symbol: string
    name: string
    description: string
    condition: number
    powerOutput: number
    requirements: {
      power: number
      crew: number
      slots: number
    }
  }
  engine: {
    symbol: string
    name: string
    description: string
    condition: number
    speed: number
    requirements: {
      power: number
      crew: number
      slots: number
    }
  }
  modules: Array<{
    symbol: string
    capacity: number
    range: number
    name: string
    description: string
    requirements: {
      power: number
      crew: number
      slots: number
    }
  }>
  mounts: Array<{
    symbol: string
    name: string
    description: string
    strength: number
    deposits: string[]
    requirements: {
      power: number
      crew: number
      slots: number
    }
  }>
}

export type ShipyardResponse = {
  symbol: string
  shipTypes: Array<{
    type: string
  }>
  transactions?: Array<{
    waypointSymbol: string
    shipSymbol: string
    price: number
    agentSymbol: string
    timestamp: string
  }>
  ships?: ShipyardShip[]
}

export type CooldownResponse = {
  shipSymbol: string
  totalSeconds: number
  remainingSeconds: number
  expiration: string
}

export type SurveyResponse = {
  signature: string
  symbol: string
  deposits: Array<{
    symbol: string
  }>
  expiration: string
  size: string
}

export type ExtractResponse = {
  shipSymbol: string
  yield: {
    symbol: string
    units: number
  }
}

export type RegisterAgentResponse = {
  token: string
  agent: AgentResponse
  contract: ContractResponse
  faction: FactionResponse
  ship: ShipResponse
}
