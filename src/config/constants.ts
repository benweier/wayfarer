export const ERROR_CODE: ReadonlyMap<string, number> = new Map([
  ['WAYPOINT_ALREADY_CHARTED', 4230],
  ['SURVEY_MUST_BE_DONE_WHILE_ORBITING', 4223],
  ['INSUFFICIENT_FUNDS', 4216],
  ['ALREADY_ACCEPTED_CONTRACT', 4501],
  ['GOOD_NOT_AVAILABLE_AT_MARKET', 4602],
])

export const REFINE_ITEM_TYPE: ReadonlyMap<string, string> = new Map([
  ['ALUMINUM_ORE', 'ALUMINUM'],
  ['COPPER_ORE', 'COPPER'],
  ['GOLD_ORE', 'GOLD'],
  ['IRON_ORE', 'IRON'],
  ['MERITIUM_ORE', 'MERITIUM'],
  ['PLATINUM_ORE', 'PLATINUM'],
  ['SILVER_ORE', 'SILVER'],
  ['URANITE_ORE', 'URANITE'],
])

export const SHIP_MOUNT_TYPE: ReadonlyMap<string, string> = new Map([
  ['MOUNT_GAS_SIPHON_I', 'Mount Gas Siphon I'],
  ['MOUNT_GAS_SIPHON_II', 'Mount Gas Siphon II'],
  ['MOUNT_GAS_SIPHON_III', 'Mount Gas Siphon III'],
  ['MOUNT_SURVEYOR_I', 'Mount Surveyor I'],
  ['MOUNT_SURVEYOR_II', 'Mount Surveyor II'],
  ['MOUNT_SURVEYOR_III', 'Mount Surveyor III'],
  ['MOUNT_SENSOR_ARRAY_I', 'Mount Sensor Array I'],
  ['MOUNT_SENSOR_ARRAY_II', 'Mount Sensor Array II'],
  ['MOUNT_SENSOR_ARRAY_III', 'Mount Sensor Array III'],
  ['MOUNT_MINING_LASER_I', 'Mount Mining Laser I'],
  ['MOUNT_MINING_LASER_II', 'Mount Mining Laser II'],
  ['MOUNT_MINING_LASER_III', 'Mount Mining Laser III'],
  ['MOUNT_LASER_CANNON_I', 'Mount Laser Cannon I'],
  ['MOUNT_MISSILE_LAUNCHER_I', 'Mount Missile Launcher I'],
  ['MOUNT_TURRET_I', 'Mount Turret I'],
])
