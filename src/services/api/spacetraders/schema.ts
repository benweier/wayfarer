import * as v from 'valibot'

export function SpaceTradersResponseSchema<T extends v.BaseSchema<any, any, any>>(
  data: T,
): v.ObjectSchema<{ data: T }, any>

export function SpaceTradersResponseSchema<T extends v.BaseSchema<any, any, any>, M extends v.ObjectSchema<any, any>>(
  data: T,
  meta: M,
): v.ObjectSchema<{ data: T; meta: M }, any>

export function SpaceTradersResponseSchema<T extends v.ObjectSchema<any, any>, M extends v.ObjectSchema<any, any>>(
  data: T,
  meta?: M,
) {
  if (!meta) {
    return v.object({
      data,
    })
  }

  return v.object({
    data,
    meta,
  })
}

export const PaginationMetaSchema = v.object({
  total: v.number(),
  page: v.number(),
  limit: v.number(),
})

export const AgentResponseSchema = v.object({
  accountId: v.string(),
  symbol: v.string(),
  headquarters: v.string(),
  credits: v.number(),
  startingFaction: v.string(),
  shipCount: v.number(),
})

export type AgentResponse = v.InferOutput<typeof AgentResponseSchema>

export const FactionResponseSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
  headquarters: v.string(),
  traits: v.array(
    v.object({
      symbol: v.string(),
      name: v.string(),
      description: v.string(),
    }),
  ),
})

export type FactionResponse = v.InferOutput<typeof FactionResponseSchema>

// StatusResponse
export const StatusResponseSchema = v.object({
  status: v.string(),
  version: v.string(),
  resetDate: v.string(),
  description: v.string(),
  stats: v.object({
    agents: v.number(),
    ships: v.number(),
    systems: v.number(),
    waypoints: v.number(),
  }),
  leaderboards: v.object({
    mostCredits: v.array(
      v.object({
        agentSymbol: v.string(),
        credits: v.number(),
      }),
    ),
    mostSubmittedCharts: v.array(
      v.object({
        agentSymbol: v.string(),
        chartCount: v.number(),
      }),
    ),
  }),
  serverResets: v.object({
    next: v.string(),
    frequency: v.string(),
  }),
  announcements: v.array(
    v.object({
      title: v.string(),
      body: v.string(),
    }),
  ),
  links: v.array(
    v.object({
      name: v.string(),
      url: v.string(),
    }),
  ),
})

export type StatusResponse = v.InferOutput<typeof StatusResponseSchema>

// Contract schemas
export const ContractDeliverySchema = v.object({
  tradeSymbol: v.string(),
  destinationSymbol: v.string(),
  unitsRequired: v.number(),
  unitsFulfilled: v.number(),
})

export type ContractDelivery = v.InferOutput<typeof ContractDeliverySchema>

export const ContractTermSchema = v.object({
  deadline: v.string(),
  payment: v.object({
    onAccepted: v.number(),
    onFulfilled: v.number(),
  }),
  deliver: v.array(ContractDeliverySchema),
})

export type ContractTerm = v.InferOutput<typeof ContractTermSchema>

export const ContractResponseSchema = v.object({
  id: v.string(),
  factionSymbol: v.string(),
  type: v.string(),
  terms: ContractTermSchema,
  accepted: v.boolean(),
  fulfilled: v.boolean(),
  expiration: v.string(),
  deadlineToAccept: v.string(),
})

export type ContractResponse = v.InferOutput<typeof ContractResponseSchema>

// Fuel schema
export const FuelResponseSchema = v.object({
  current: v.number(),
  capacity: v.number(),
  consumed: v.object({
    amount: v.number(),
    timestamp: v.string(),
  }),
})

export type FuelResponse = v.InferOutput<typeof FuelResponseSchema>

// Navigation schemas
export const NavigationRouteSchema = v.object({
  origin: v.object({
    symbol: v.string(),
    type: v.string(),
    systemSymbol: v.string(),
    x: v.number(),
    y: v.number(),
  }),
  destination: v.object({
    symbol: v.string(),
    type: v.string(),
    systemSymbol: v.string(),
    x: v.number(),
    y: v.number(),
  }),
  arrival: v.string(),
  departureTime: v.string(),
})

export type NavigationRoute = v.InferOutput<typeof NavigationRouteSchema>

export const NavigationResponseSchema = v.object({
  systemSymbol: v.string(),
  waypointSymbol: v.string(),
  route: NavigationRouteSchema,
  status: v.string(),
  flightMode: v.string(),
})

export type NavigationResponse = v.InferOutput<typeof NavigationResponseSchema>

// Ship component schemas
export const ShipCrewSchema = v.object({
  current: v.number(),
  capacity: v.number(),
  required: v.number(),
  rotation: v.string(),
  morale: v.number(),
  wages: v.number(),
})

export type ShipCrew = v.InferOutput<typeof ShipCrewSchema>

export const ShipFuelSchema = v.object({
  current: v.number(),
  capacity: v.number(),
  consumed: v.object({
    amount: v.number(),
    timestamp: v.string(),
  }),
})

export type ShipFuel = v.InferOutput<typeof ShipFuelSchema>

export const ShipFrameSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
  moduleSlots: v.number(),
  mountingPoints: v.number(),
  fuelCapacity: v.number(),
  condition: v.number(),
  integrity: v.number(),
  requirements: v.object({
    power: v.number(),
    crew: v.number(),
  }),
})

export type ShipFrame = v.InferOutput<typeof ShipFrameSchema>

export const ShipReactorSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
  condition: v.number(),
  integrity: v.number(),
  powerOutput: v.number(),
  requirements: v.object({
    crew: v.number(),
  }),
})

export type ShipReactor = v.InferOutput<typeof ShipReactorSchema>

export const ShipEngineSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
  condition: v.number(),
  integrity: v.number(),
  speed: v.number(),
  requirements: v.object({
    power: v.number(),
    crew: v.number(),
  }),
})

export type ShipEngine = v.InferOutput<typeof ShipEngineSchema>

export const ShipModuleSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
  capacity: v.optional(v.number()),
  range: v.optional(v.number()),
  requirements: v.object({
    crew: v.number(),
    power: v.number(),
    slots: v.number(),
  }),
})

export type ShipModule = v.InferOutput<typeof ShipModuleSchema>

export const ShipMountSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
  strength: v.optional(v.number()),
  deposits: v.array(v.string()),
  requirements: v.object({
    power: v.number(),
    crew: v.number(),
    slots: v.optional(v.number()),
  }),
})

export type ShipMount = v.InferOutput<typeof ShipMountSchema>

export const ShipRegistrationSchema = v.object({
  name: v.string(),
  factionSymbol: v.string(),
  role: v.string(),
})

export type ShipRegistration = v.InferOutput<typeof ShipRegistrationSchema>

export const CargoInventorySchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
  units: v.number(),
})

export type CargoInventory = v.InferOutput<typeof CargoInventorySchema>

export const ShipCargoSchema = v.object({
  capacity: v.number(),
  units: v.number(),
  inventory: v.array(CargoInventorySchema),
})

export type ShipCargo = v.InferOutput<typeof ShipCargoSchema>

// Cooldown schema (defined here since ShipResponse depends on it)
export const CooldownResponseSchema = v.object({
  shipSymbol: v.string(),
  totalSeconds: v.number(),
  remainingSeconds: v.number(),
  expiration: v.optional(v.string()),
})

export type CooldownResponse = v.InferOutput<typeof CooldownResponseSchema>

// Ship response schema
export const ShipResponseSchema = v.object({
  symbol: v.string(),
  nav: NavigationResponseSchema,
  crew: ShipCrewSchema,
  fuel: ShipFuelSchema,
  frame: ShipFrameSchema,
  reactor: ShipReactorSchema,
  engine: ShipEngineSchema,
  cooldown: CooldownResponseSchema,
  modules: v.array(ShipModuleSchema),
  mounts: v.array(ShipMountSchema),
  registration: ShipRegistrationSchema,
  cargo: ShipCargoSchema,
})

export type ShipResponse = v.InferOutput<typeof ShipResponseSchema>

// Waypoint schemas
export const WaypointOrbitalSchema = v.object({
  symbol: v.string(),
})

export type WaypointOrbital = v.InferOutput<typeof WaypointOrbitalSchema>

export const SystemWaypointSchema = v.object({
  symbol: v.string(),
  type: v.string(),
  x: v.number(),
  y: v.number(),
  orbits: v.optional(v.string()),
  orbitals: v.array(WaypointOrbitalSchema),
})

export type SystemWaypoint = v.InferOutput<typeof SystemWaypointSchema>

export const SystemFactionSchema = v.object({
  symbol: v.string(),
})

export type SystemFaction = v.InferOutput<typeof SystemFactionSchema>

export const SystemResponseSchema = v.object({
  symbol: v.string(),
  sectorSymbol: v.string(),
  type: v.string(),
  x: v.number(),
  y: v.number(),
  waypoints: v.array(SystemWaypointSchema),
  factions: v.array(SystemFactionSchema),
})

export type SystemResponse = v.InferOutput<typeof SystemResponseSchema>

export const WaypointChartSchema = v.object({
  submittedBy: v.string(),
  submittedOn: v.string(),
})

export type WaypointChart = v.InferOutput<typeof WaypointChartSchema>

export const WaypointFactionSchema = v.object({
  symbol: v.string(),
})

export type WaypointFaction = v.InferOutput<typeof WaypointFactionSchema>

export const WaypointTraitSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
})

export type WaypointTrait = v.InferOutput<typeof WaypointTraitSchema>

export const WaypointModifierSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
})

export type WaypointModifier = v.InferOutput<typeof WaypointModifierSchema>

export const WaypointResponseSchema = v.object({
  symbol: v.string(),
  type: v.string(),
  systemSymbol: v.string(),
  x: v.number(),
  y: v.number(),
  orbitals: v.array(WaypointOrbitalSchema),
  orbits: v.optional(v.string()),
  faction: WaypointFactionSchema,
  traits: v.array(WaypointTraitSchema),
  modifiers: v.array(WaypointModifierSchema),
  chart: v.optional(WaypointChartSchema),
  isUnderConstruction: v.boolean(),
})

export type WaypointResponse = v.InferOutput<typeof WaypointResponseSchema>

// Market schemas
export const MarketGoodSchema = v.object({
  symbol: v.string(),
  name: v.string(),
  description: v.string(),
})

export type MarketGood = v.InferOutput<typeof MarketGoodSchema>

export const MarketTradeGoodSchema = v.object({
  symbol: v.string(),
  tradeVolume: v.number(),
  supply: v.string(),
  purchasePrice: v.number(),
  sellPrice: v.number(),
})

export type MarketTradeGood = v.InferOutput<typeof MarketTradeGoodSchema>

export const MarketTransactionSchema = v.object({
  shipSymbol: v.string(),
  tradeSymbol: v.string(),
  type: v.string(),
  units: v.number(),
  pricePerUnit: v.number(),
  totalPrice: v.number(),
  timestamp: v.string(),
})

export type MarketTransaction = v.InferOutput<typeof MarketTransactionSchema>

export const MarketResponseSchema = v.object({
  symbol: v.string(),
  exports: v.array(MarketGoodSchema),
  imports: v.array(MarketGoodSchema),
  exchange: v.array(MarketGoodSchema),
  transactions: v.array(MarketTransactionSchema),
  tradeGoods: v.optional(v.array(MarketTradeGoodSchema)),
})

export type MarketResponse = v.InferOutput<typeof MarketResponseSchema>

// Chart response schema
export const ChartResponseSchema = v.object({
  waypointSymbol: v.string(),
  submittedBy: v.string(),
  submittedOn: v.string(),
})

export type ChartResponse = v.InferOutput<typeof ChartResponseSchema>

// Jump Gate schemas
export const JumpGateConnectedSystemSchema = v.object({
  symbol: v.string(),
  sectorSymbol: v.string(),
  type: v.string(),
  factionSymbol: v.string(),
  x: v.number(),
  y: v.number(),
  distance: v.number(),
})

export type JumpGateConnectedSystem = v.InferOutput<typeof JumpGateConnectedSystemSchema>

export const JumpGateResponseSchema = v.object({
  jumpRange: v.number(),
  factionSymbol: v.string(),
  connectedSystems: v.array(JumpGateConnectedSystemSchema),
})

export type JumpGateResponse = v.InferOutput<typeof JumpGateResponseSchema>

// Shipyard schemas
export const ShipyardShipSchema = v.object({
  type: v.string(),
  name: v.string(),
  description: v.string(),
  purchasePrice: v.number(),
  frame: v.object({
    symbol: v.string(),
    name: v.string(),
    description: v.string(),
    condition: v.number(),
    moduleSlots: v.number(),
    mountingPoints: v.number(),
    fuelCapacity: v.number(),
    requirements: v.object({
      power: v.number(),
      crew: v.number(),
      slots: v.number(),
    }),
  }),
  reactor: v.object({
    symbol: v.string(),
    name: v.string(),
    description: v.string(),
    condition: v.number(),
    powerOutput: v.number(),
    requirements: v.object({
      power: v.number(),
      crew: v.number(),
      slots: v.number(),
    }),
  }),
  engine: v.object({
    symbol: v.string(),
    name: v.string(),
    description: v.string(),
    condition: v.number(),
    speed: v.number(),
    requirements: v.object({
      power: v.number(),
      crew: v.number(),
      slots: v.number(),
    }),
  }),
  modules: v.array(
    v.object({
      symbol: v.string(),
      capacity: v.number(),
      range: v.number(),
      name: v.string(),
      description: v.string(),
      requirements: v.object({
        power: v.number(),
        crew: v.number(),
        slots: v.number(),
      }),
    }),
  ),
  mounts: v.array(
    v.object({
      symbol: v.string(),
      name: v.string(),
      description: v.string(),
      strength: v.number(),
      deposits: v.array(v.string()),
      requirements: v.object({
        power: v.number(),
        crew: v.number(),
        slots: v.number(),
      }),
    }),
  ),
})

export type ShipyardShip = v.InferOutput<typeof ShipyardShipSchema>

export const ShipyardResponseSchema = v.object({
  symbol: v.string(),
  shipTypes: v.array(
    v.object({
      type: v.string(),
    }),
  ),
  transactions: v.optional(
    v.array(
      v.object({
        waypointSymbol: v.string(),
        shipSymbol: v.string(),
        price: v.number(),
        agentSymbol: v.string(),
        timestamp: v.string(),
      }),
    ),
  ),
  ships: v.optional(v.array(ShipyardShipSchema)),
})

export type ShipyardResponse = v.InferOutput<typeof ShipyardResponseSchema>

// Survey schema
export const SurveyResponseSchema = v.object({
  signature: v.string(),
  symbol: v.string(),
  deposits: v.array(
    v.object({
      symbol: v.string(),
    }),
  ),
  expiration: v.string(),
  size: v.string(),
})

export type SurveyResponse = v.InferOutput<typeof SurveyResponseSchema>

// Extract schema
export const ExtractResponseSchema = v.object({
  shipSymbol: v.string(),
  yield: v.object({
    symbol: v.string(),
    units: v.number(),
  }),
})

export type ExtractResponse = v.InferOutput<typeof ExtractResponseSchema>

// Siphon schemas
export const SiphonYieldSchema = v.object({
  symbol: v.string(),
  units: v.number(),
})

export type SiphonYield = v.InferOutput<typeof SiphonYieldSchema>

export const SiphonResultSchema = v.object({
  shipSymbol: v.string(),
  yield: SiphonYieldSchema,
})

export type SiphonResult = v.InferOutput<typeof SiphonResultSchema>

export const ShipSiphonResponseSchema = v.object({
  cooldown: CooldownResponseSchema,
  siphon: SiphonResultSchema,
  cargo: ShipCargoSchema,
})

export type ShipSiphonResponse = v.InferOutput<typeof ShipSiphonResponseSchema>

// Ship transaction schemas
export const ShipRepairTransactionSchema = v.object({
  waypointSymbol: v.string(),
  shipSymbol: v.string(),
  totalPrice: v.number(),
  timestamp: v.string(),
})

export type ShipRepairTransaction = v.InferOutput<typeof ShipRepairTransactionSchema>

export const ShipScrapTransactionSchema = v.object({
  waypointSymbol: v.string(),
  shipSymbol: v.string(),
  totalPrice: v.number(),
  timestamp: v.string(),
})

export type ShipScrapTransaction = v.InferOutput<typeof ShipScrapTransactionSchema>

// Register agent response schema
export const RegisterAgentResponseSchema = v.object({
  token: v.string(),
  agent: AgentResponseSchema,
  contract: ContractResponseSchema,
  faction: FactionResponseSchema,
  ship: ShipResponseSchema,
})

export type RegisterAgentResponse = v.InferOutput<typeof RegisterAgentResponseSchema>
