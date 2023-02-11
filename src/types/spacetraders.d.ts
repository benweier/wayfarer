export type RegisterAgentRequest = {
  symbol: string
  faction: string
}

export type AgentResponse = {
  accountId: string
  symbol: string
  headquarters: string
  credits: number
}

export type ContractResponse = {
  id: string
  factionSymbol: string
  type: string
  terms: {
    deadline: string
    payment: {
      onAccepted: number
      onFulfilled: number
    }
    deliver: Array<{
      tradeSymbol: string
      destinationSymbol: string
      unitsRequired: number
      unitsFulfilled: number
    }>
  }
  accepted: boolean
  fulfilled: boolean
  expiration: string
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

export type NavigationResponse = {
  systemSymbol: string
  waypointSymbol: string
  route: {
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
  }
  status: string
  flightMode: string
}

export type ShipResponse = {
  symbol: string
  nav: NavigationResponse
  crew: {
    current: number
    capacity: number
    required: number
    rotation: string
    morale: number
    wages: number
  }
  fuel: {
    current: number
    capacity: number
    consumed: {
      amount: number
      timestamp: string
    }
  }
  frame: {
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
  reactor: {
    symbol: string
    name: string
    description: string
    condition: number
    powerOutput: number
    requirements: {
      crew: number
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
    }
  }
  modules: Array<{
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
  }>
  mounts: [
    {
      symbol: string
      name: string
      description: string
      strength: number
      requirements: {
        crew: number
        power: number
      }
    },
    {
      symbol: string
      name: string
      description: string
      strength: number
      requirements: {
        crew: number
        power: number
      }
    },
    {
      symbol: string
      name: string
      description: string
      strength: number
      deposits: string[]
      requirements: {
        crew: number
        power: number
      }
    },
  ]
  registration: {
    name: string
    factionSymbol: string
    role: string
  }
  cargo: {
    capacity: number
    units: number
    inventory: Array<{
      symbol: string
      name: string
      description: string
      units: number
    }>
  }
}

export type SystemsResponse = {
  symbol: string
  sectorSymbol: string
  type: string
  x: number
  y: number
  waypoints: [
    {
      symbol: string
      type: string
      x: number
      y: number
    },
  ]
  factions: [
    {
      symbol: string
    },
  ]
}

export type ChartResponse = {
  waypointSymbol: string
  submittedBy: string
  submittedOn: string
}

export type WaypointResponse = {
  symbol: string
  type: string
  systemSymbol: string
  x: number
  y: number
  orbitals: Array<{
    symbol: string
  }>
  faction: {
    symbol: string
  }
  traits: Array<{
    symbol: string
    name: string
    description: string
  }>
  chart: ChartResponse
}

export type MarketResponse = {
  symbol: string
  exports: Array<{
    symbol: string
    name: string
    description: string
  }>
  imports: Array<{
    symbol: string
    name: string
    description: string
  }>
  exchange: Array<{
    symbol: string
    name: string
    description: string
  }>
  transactions: Array<{
    shipSymbol: string
    tradeSymbol: string
    type: string
    units: 1
    pricePerUnit: 1
    totalPrice: 1
    timestamp: string
  }>
  tradeGoods: Array<{
    symbol: string
    tradeVolume: 1
    supply: string
    purchasePrice: 0
    sellPrice: 0
  }>
}

export type RegisterAgentResponse = {
  token: string
  agent: AgentResponse
  contract: ContractResponse
  faction: FactionResponse
  ship: ShipResponse
}
