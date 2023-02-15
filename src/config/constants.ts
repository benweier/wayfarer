export const ERROR_CODE: Record<string, number> = {
  WAYPOINT_ALREADY_CHARTED: 4230,
  SURVEY_MUST_BE_DONE_WHILE_ORBITING: 4223,
  INSUFFICIENT_FUNDS: 4216,
  ALREADY_ACCEPTED_CONTRACT: 4501,
  GOOD_NOT_AVAILABLE_AT_MARKET: 4602,
} as const

export const CONTRACT_TYPE: Record<string, string> = {
  PROCUREMENT: 'Procurement',
  TRANSPORT: 'Transport',
  SHUTTLE: 'Shuttle',
} as const

export const FACTION_TRAIT_SYMBOL: Record<string, string> = {
  BUREAUCRATIC: 'Bureaucratic',
  SECRETIVE: 'Secretive',
  CAPITALISTIC: 'Capitalistic',
  INDUSTRIOUS: 'Industrious',
  PEACEFUL: 'Peaceful',
  DISTRUSTFUL: 'Distrustful',
  WELCOMING: 'Welcoming',
  ANARCHIST: 'Anarchist',
  CONFLICTED: 'Conflicted',
  AUTHORITARIAN: 'Authoritarian',
  OLIGARCHICAL: 'Oligarchical',
  DYNASTIC: 'Dynastic',
  DEMOCRATIC: 'Democratic',
  DECENTRALIZED: 'Decentralized',
  SMUGGLERS: 'Smugglers',
  SCAVENGERS: 'Scavengers',
  REBELLIOUS: 'Rebellious',
  EXILES: 'Exiles',
  PIRATES: 'Pirates',
  RAIDERS: 'Raiders',
  CLAN: 'Clan',
  GUILD: 'Guild',
  DOMINION: 'Dominion',
  FRINGE: 'Fringe',
  FORSAKEN: 'Forsaken',
  ISOLATED: 'Isolated',
  LOCALIZED: 'Localized',
  ESTABLISHED: 'Established',
  NOTABLE: 'Notable',
  DOMINANT: 'Dominant',
  INESCAPABLE: 'Inescapable',
  INNOVATIVE: 'Innovative',
  BOLD: 'Bold',
  VISIONARY: 'Visionary',
  CURIOUS: 'Curious',
  DARING: 'Daring',
  EXPLORATORY: 'Exploratory',
  RESOURCEFUL: 'Resourceful',
  FLEXIBLE: 'Flexible',
  COOPERATIVE: 'Cooperative',
  UNITED: 'United',
  STRATEGIC: 'Strategic',
  INTELLIGENT: 'Intelligent',
  RESEARCH_FOCUSED: 'Research Focused',
  COLLABORATIVE: 'Collaborative',
  PROGRESSIVE: 'Progressive',
  MILITARISTIC: 'Militaristic',
  TECHNOLOGICALLY_ADVANCED: 'Technologically Advanced',
  AGGRESSIVE: 'Aggressive',
  IMPERIALISTIC: 'Imperialistic',
  TREASURE_HUNTERS: 'Treasure Hunters',
  DEXTEROUS: 'Dexterous',
  UNPREDICTABLE: 'Unpredictable',
  BRUTAL: 'Brutal',
  FLEETING: 'Fleeting',
  ADAPTABLE: 'Adaptable',
  SELF_SUFFICIENT: 'Self Sufficient',
  DEFENSIVE: 'Defensive',
  PROUD: 'Proud',
  DIVERSE: 'Diverse',
  INDEPENDENT: 'Independent',
  SELF_INTERESTED: 'Self Interested',
  FRAGMENTED: 'Fragmented',
  COMMERCIAL: 'Commercial',
  FREE_MARKETS: 'Free Markets',
  ENTREPRENEURIAL: 'Entrepreneurial',
} as const

export const SHIP_NAV_FLIGHT_MODE: Record<string, string> = {
  DRIFT: 'Drift',
  STEALTH: 'Stealth',
  CRUISE: 'Cruise',
  BURN: 'Burn',
} as const

export const SHIP_NAV_STATUS: Record<string, string> = {
  IN_TRANSIT: 'In Transit',
  IN_ORBIT: 'In Orbit',
  DOCKED: 'Docked',
} as const

export const SYSTEM_TYPE: Record<string, string> = {
  NEUTRON_STAR: 'Neutron Star',
  RED_STAR: 'Red Star',
  ORANGE_STAR: 'Orange Star',
  BLUE_STAR: 'Blue Star',
  YOUNG_STAR: 'Young Star',
  WHITE_DWARF: 'White Dwarf',
  BLACK_HOLE: 'Black Hole',
  HYPERGIANT: 'Hypergiant',
  NEBULA: 'Nebula',
  UNSTABLE: 'Unstable',
} as const

export const WAYPOINT_TYPE: Record<string, string> = {
  PLANET: 'Planet',
  GAS_GIANT: 'Gas Giant',
  MOON: 'Moon',
  ORBITAL_STATION: 'Orbital Station',
  JUMP_GATE: 'Jump Gate',
  ASTEROID_FIELD: 'Asteroid Field',
  NEBULA: 'Nebula',
  DEBRIS_FIELD: 'Debris Field',
  GRAVITY_WELL: 'Gravity Well',
} as const

export const WAYPOINT_TRAIT_SYMBOL: Record<string, string> = {
  UNCHARTED: 'Uncharted',
  MARKETPLACE: 'Marketplace',
  SHIPYARD: 'Shipyard',
  OUTPOST: 'Outpost',
  SCATTERED_SETTLEMENTS: 'Scattered Settlements',
  SPRAWLING_CITIES: 'Sprawling Cities',
  MEGA_STRUCTURES: 'Mega Structures',
  OVERCROWDED: 'Overcrowded',
  HIGH_TECH: 'High Tech',
  CORRUPT: 'Corrupt',
  BUREAUCRATIC: 'Bureaucratic',
  TRADING_HUB: 'Trading Hub',
  INDUSTRIAL: 'Industrial',
  BLACK_MARKET: 'Black Market',
  RESEARCH_FACILITY: 'Research Facility',
  MILITARY_BASE: 'Military Base',
  SURVEILLANCE_OUTPOST: 'Surveillance Outpost',
  EXPLORATION_OUTPOST: 'Exploration Outpost',
  MINERAL_DEPOSITS: 'Mineral Deposits',
  COMMON_METAL_DEPOSITS: 'Common Metal Deposits',
  PRECIOUS_METAL_DEPOSITS: 'Precious Metal Deposits',
  RARE_METAL_DEPOSITS: 'Rare Metal Deposits',
  METHANE_POOLS: 'Methane Pools',
  ICE_CRYSTALS: 'Ice Crystals',
  EXPLOSIVE_GASES: 'Explosive Gases',
  STRONG_MAGNETOSPHERE: 'Strong Magnetosphere',
  VIBRANT_AURORAS: 'Vibrant Auroras',
  SALT_FLATS: 'Salt Flats',
  CANYONS: 'Canyons',
  PERPETUAL_DAYLIGHT: 'Perpetual Daylight',
  PERPETUAL_OVERCAST: 'Perpetual Overcast',
  DRY_SEABEDS: 'Dry Seabeds',
  MAGMA_SEAS: 'Magma Seas',
  SUPERVOLCANOES: 'Supervolcanoes',
  ASH_CLOUDS: 'Ash Clouds',
  VAST_RUINS: 'Vast Ruins',
  MUTATED_FLORA: 'Mutated Flora',
  TERRAFORMED: 'Terraformed',
  EXTREME_TEMPERATURES: 'Extreme Temperatures',
  EXTREME_PRESSURE: 'Extreme Pressure',
  DIVERSE_LIFE: 'Diverse Life',
  SCARCE_LIFE: 'Scarce Life',
  FOSSILS: 'Fossils',
  WEAK_GRAVITY: 'Weak Gravity',
  STRONG_GRAVITY: 'Strong Gravity',
  CRUSHING_GRAVITY: 'Crushing Gravity',
  TOXIC_ATMOSPHERE: 'Toxic Atmosphere',
  CORROSIVE_ATMOSPHERE: 'Corrosive Atmosphere',
  BREATHABLE_ATMOSPHERE: 'Breathable Atmosphere',
  JOVIAN: 'Jovian',
  ROCKY: 'Rocky',
  VOLCANIC: 'Volcanic',
  FROZEN: 'Frozen',
  SWAMP: 'Swamp',
  BARREN: 'Barren',
  TEMPERATE: 'Temperate',
  JUNGLE: 'Jungle',
  OCEAN: 'Ocean',
  STRIPPED: 'Stripped',
} as const

export const SHIP_TYPE: Record<string, string> = {
  SHIP_PROBE: 'Ship Probe',
  SHIP_MINING_DRONE: 'Ship Mining Drone',
  SHIP_INTERCEPTOR: 'Ship Interceptor',
  SHIP_LIGHT_HAULER: 'Ship Light Hauler',
  SHIP_COMMAND_FRIGATE: 'Ship Command Frigate',
  SHIP_EXPLORER: 'Ship Explorer',
  SHIP_HEAVY_FREIGHTER: 'Ship Heavy Freighter',
  SHIP_LIGHT_SHUTTLE: 'Ship Light Shuttle',
  SHIP_ORE_HOUND: 'Ship Ore Hound',
  SHIP_REFINING_FREIGHTER: 'Ship Refining Freighter',
} as const

export const TRADE_SYMBOL: Record<string, string> = {
  ADVANCED_CIRCUITRY: 'Advanced Circuitry',
  AI_MAINFRAMES: 'Ai Mainframes',
  ALUMINUM_ORE: 'Aluminum Ore',
  ALUMINUM: 'Aluminum',
  AMMONIA_ICE: 'Ammonia Ice',
  AMMUNITION: 'Ammunition',
  ANTIMATTER: 'Antimatter',
  ASSAULT_RIFLES: 'Assault Rifles',
  BIOCOMPOSITES: 'Biocomposites',
  BOTANICAL_SPECIMENS: 'Botanical Specimens',
  CLOTHING: 'Clothing',
  COPPER_ORE: 'Copper Ore',
  COPPER: 'Copper',
  CULTURAL_ARTIFACTS: 'Cultural Artifacts',
  CYBER_IMPLANTS: 'Cyber Implants',
  DIAMONDS: 'Diamonds',
  DRUGS: 'Drugs',
  ELECTRONICS: 'Electronics',
  ENGINE_HYPER_DRIVE_I: 'Engine Hyper Drive I',
  ENGINE_IMPULSE_DRIVE_I: 'Engine Impulse Drive I',
  ENGINE_ION_DRIVE_I: 'Engine Ion Drive I',
  ENGINE_ION_DRIVE_II: 'Engine Ion Drive II',
  EQUIPMENT: 'Equipment',
  EXOTIC_MATTER: 'Exotic Matter',
  EXPLOSIVES: 'Explosives',
  FABRICS: 'Fabrics',
  FERTILIZERS: 'Fertilizers',
  FIREARMS: 'Firearms',
  FOOD: 'Food',
  FUEL: 'Fuel',
  GENE_THERAPEUTICS: 'Gene Therapeutics',
  GOLD_ORE: 'Gold Ore',
  GOLD: 'Gold',
  GRAVITON_EMITTERS: 'Graviton Emitters',
  HOLOGRAPHICS: 'Holographics',
  HYDROCARBON: 'Hydrocarbon',
  ICE_WATER: 'Ice Water',
  IRON_ORE: 'Iron Ore',
  IRON: 'Iron',
  JEWELRY: 'Jewelry',
  LAB_INSTRUMENTS: 'Lab Instruments',
  LASER_RIFLES: 'Laser Rifles',
  LIQUID_HYDROGEN: 'Liquid Hydrogen',
  LIQUID_NITROGEN: 'Liquid Nitrogen',
  MACHINERY: 'Machinery',
  MEDICINE: 'Medicine',
  MERITIUM_ORE: 'Meritium Ore',
  MERITIUM: 'Meritium',
  MICRO_FUSION_GENERATORS: 'Micro Fusion Generators',
  MICROPROCESSORS: 'Microprocessors',
  MILITARY_EQUIPMENT: 'Military Equipment',
  MODULE_CARGO_HOLD_I: 'Module Cargo Hold I',
  MODULE_CREW_QUARTERS_I: 'Module Crew Quarters I',
  MODULE_ENVOY_QUARTERS_I: 'Module Envoy Quarters I',
  MODULE_FUEL_REFINERY_I: 'Module Fuel Refinery I',
  MODULE_JUMP_DRIVE_I: 'Module Jump Drive I',
  MODULE_JUMP_DRIVE_II: 'Module Jump Drive II',
  MODULE_JUMP_DRIVE_III: 'Module Jump Drive III',
  MODULE_MICRO_REFINERY_I: 'Module Micro Refinery I',
  MODULE_MINERAL_PROCESSOR_I: 'Module Mineral Processor I',
  MODULE_ORE_REFINERY_I: 'Module Ore Refinery I',
  MODULE_PASSENGER_CABIN_I: 'Module Passenger Cabin I',
  MODULE_SCIENCE_LAB_I: 'Module Science Lab I',
  MODULE_SHIELD_GENERATOR_I: 'Module Shield Generator I',
  MODULE_SHIELD_GENERATOR_II: 'Module Shield Generator II',
  MOOD_REGULATORS: 'Mood Regulators',
  MOUNT_GAS_SIPHON_I: 'Mount Gas Siphon I',
  MOUNT_GAS_SIPHON_II: 'Mount Gas Siphon II',
  MOUNT_GAS_SIPHON_III: 'Mount Gas Siphon III',
  MOUNT_LASER_CANNON_I: 'Mount Laser Cannon I',
  MOUNT_MINING_LASER_I: 'Mount Mining Laser I',
  MOUNT_MINING_LASER_II: 'Mount Mining Laser II',
  MOUNT_MINING_LASER_III: 'Mount Mining Laser III',
  MOUNT_MISSILE_LAUNCHER_I: 'Mount Missile Launcher I',
  MOUNT_SENSOR_ARRAY_I: 'Mount Sensor Array I',
  MOUNT_SENSOR_ARRAY_II: 'Mount Sensor Array II',
  MOUNT_SENSOR_ARRAY_III: 'Mount Sensor Array III',
  MOUNT_SURVEYOR_I: 'Mount Surveyor I',
  MOUNT_SURVEYOR_II: 'Mount Surveyor II',
  MOUNT_SURVEYOR_III: 'Mount Surveyor III',
  MOUNT_TURRET_I: 'Mount Turret I',
  NANOBOTS: 'Nanobots',
  NEURAL_CHIPS: 'Neural Chips',
  NOVEL_LIFEFORMS: 'Novel Lifeforms',
  PLASTICS: 'Plastics',
  PLATINUM_ORE: 'Platinum Ore',
  PLATINUM: 'Platinum',
  POLYNUCLEOTIDES: 'Polynucleotides',
  PRECIOUS_STONES: 'Precious Stones',
  QUANTUM_DRIVES: 'Quantum Drives',
  QUARTZ_SAND: 'Quartz Sand',
  REACTOR_ANTIMATTER_I: 'Reactor Antimatter I',
  REACTOR_CHEMICAL_I: 'Reactor Chemical I',
  REACTOR_FISSION_I: 'Reactor Fission I',
  REACTOR_FUSION_I: 'Reactor Fusion I',
  REACTOR_SOLAR_I: 'Reactor Solar I',
  RELIC_TECH: 'Relic Tech',
  ROBOTIC_DRONES: 'Robotic Drones',
  SHIP_PLATING: 'Ship Plating',
  SHIP_SALVAGE: 'Ship Salvage',
  SILICON_CRYSTALS: 'Silicon Crystals',
  SILVER_ORE: 'Silver Ore',
  SILVER: 'Silver',
  SUPERGRAINS: 'Supergrains',
  URANITE_ORE: 'Uranite Ore',
  URANITE: 'Uranite',
  VIRAL_AGENTS: 'Viral Agents',
} as const

export const MARKET_TRANSACTION_TYPE: Record<string, string> = {
  PURCHASE: 'Purchase',
  SELL: 'Sell',
} as const

export const MARKET_TRADE_GOOD_SUPPLY: Record<string, string> = {
  SCARCE: 'Scarce',
  LIMITED: 'Limited',
  MODERATE: 'Moderate',
  ABUNDANT: 'Abundant',
} as const

export const SHIP_MODULE_TYPE: Record<string, string> = {
  MODULE_MINERAL_PROCESSOR_I: 'Module Mineral Processor I',
  MODULE_CARGO_HOLD_I: 'Module Cargo Hold I',
  MODULE_CREW_QUARTERS_I: 'Module Crew Quarters I',
  MODULE_ENVOY_QUARTERS_I: 'Module Envoy Quarters I',
  MODULE_PASSENGER_CABIN_I: 'Module Passenger Cabin I',
  MODULE_MICRO_REFINERY_I: 'Module Micro Refinery I',
  MODULE_ORE_REFINERY_I: 'Module Ore Refinery I',
  MODULE_FUEL_REFINERY_I: 'Module Fuel Refinery I',
  MODULE_SCIENCE_LAB_I: 'Module Science Lab I',
  MODULE_JUMP_DRIVE_I: 'Module Jump Drive I',
  MODULE_JUMP_DRIVE_II: 'Module Jump Drive II',
  MODULE_JUMP_DRIVE_III: 'Module Jump Drive III',
  MODULE_WARP_DRIVE_I: 'Module Warp Drive I',
  MODULE_WARP_DRIVE_II: 'Module Warp Drive II',
  MODULE_WARP_DRIVE_III: 'Module Warp Drive III',
  MODULE_SHIELD_GENERATOR_I: 'Module Shield Generator I',
  MODULE_SHIELD_GENERATOR_II: 'Module Shield Generator II',
} as const

export const SHIP_FRAME_TYPE: Record<string, string> = {
  FRAME_PROBE: 'Frame Probe',
  FRAME_DRONE: 'Frame Drone',
  FRAME_INTERCEPTOR: 'Frame Interceptor',
  FRAME_RACER: 'Frame Racer',
  FRAME_FIGHTER: 'Frame Fighter',
  FRAME_FRIGATE: 'Frame Frigate',
  FRAME_SHUTTLE: 'Frame Shuttle',
  FRAME_EXPLORER: 'Frame Explorer',
  FRAME_LIGHT_FREIGHTER: 'Frame Light Freighter',
  FRAME_HEAVY_FREIGHTER: 'Frame Heavy Freighter',
  FRAME_TRANSPORT: 'Frame Transport',
  FRAME_DESTROYER: 'Frame Destroyer',
  FRAME_CRUISER: 'Frame Cruiser',
  FRAME_CARRIER: 'Frame Carrier',
  FRAME_MINER: 'Frame Miner',
} as const

export const SHIP_MOUNT_TYPE: Record<string, string> = {
  MOUNT_GAS_SIPHON_I: 'Mount Gas Siphon I',
  MOUNT_GAS_SIPHON_II: 'Mount Gas Siphon II',
  MOUNT_GAS_SIPHON_III: 'Mount Gas Siphon III',
  MOUNT_SURVEYOR_I: 'Mount Surveyor I',
  MOUNT_SURVEYOR_II: 'Mount Surveyor II',
  MOUNT_SURVEYOR_III: 'Mount Surveyor III',
  MOUNT_SENSOR_ARRAY_I: 'Mount Sensor Array I',
  MOUNT_SENSOR_ARRAY_II: 'Mount Sensor Array II',
  MOUNT_SENSOR_ARRAY_III: 'Mount Sensor Array III',
  MOUNT_MINING_LASER_I: 'Mount Mining Laser I',
  MOUNT_MINING_LASER_II: 'Mount Mining Laser II',
  MOUNT_MINING_LASER_III: 'Mount Mining Laser III',
  MOUNT_LASER_CANNON_I: 'Mount Laser Cannon I',
  MOUNT_MISSILE_LAUNCHER_I: 'Mount Missile Launcher I',
  MOUNT_TURRET_I: 'Mount Turret I',
} as const

export const SHIP_CREW_ROTATION: Record<string, string> = {
  STRICT: 'Strict',
  RELAXED: 'Relaxed',
} as const

export const SHIP_ENGINE_TYPE: Record<string, string> = {
  ENGINE_IMPULSE_DRIVE_I: 'Engine Impulse Drive I',
  ENGINE_ION_DRIVE_I: 'Engine Ion Drive I',
  ENGINE_ION_DRIVE_II: 'Engine Ion Drive II',
  ENGINE_HYPER_DRIVE_I: 'Engine Hyper Drive I',
} as const

export const SHIP_REACTOR_TYPE: Record<string, string> = {
  REACTOR_SOLAR_I: 'Reactor Solar I',
  REACTOR_FUSION_I: 'Reactor Fusion I',
  REACTOR_FISSION_I: 'Reactor Fission I',
  REACTOR_CHEMICAL_I: 'Reactor Chemical I',
  REACTOR_ANTIMATTER_I: 'Reactor Antimatter I',
} as const

export const SURVEY_SIZE: Record<string, string> = {
  SMALL: 'Small',
  MODERATE: 'Moderate',
  LARGE: 'Large',
} as const
