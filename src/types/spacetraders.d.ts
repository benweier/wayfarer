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
    units: number
    pricePerUnit: number
    totalPrice: number
    timestamp: string
  }>
  tradeGoods: Array<{
    symbol: string
    tradeVolume: number
    supply: string
    purchasePrice: number
    sellPrice: number
  }>
}

export type JumpGateResponse = {
  jumpRange: number
  factionSymbol: string
  connectedSystems: Array<{
    symbol: string
    sectorSymbol: string
    type: string
    factionSymbol: string
    x: number
    y: number
    distance: number
  }>
}

export type ShipyardResponse = {
  symbol: string
  shipTypes: Array<{
    type: string
  }>
  transactions: Array<{
    shipSymbol: string
    price: number
    agentSymbol: string
    timestamp: string
  }>
  ships: Array<{
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
    modules: [
      {
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
      },
    ]
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
  }>
}

export type CooldownResponse = {
  shipSymbol: string
  totalSeconds: number
  remainingSeconds: number
  expiration: string
}

export type RegisterAgentResponse = {
  token: string
  agent: AgentResponse
  contract: ContractResponse
  faction: FactionResponse
  ship: ShipResponse
}
