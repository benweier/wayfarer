import { type SystemsResponse } from '@/types/spacetraders'

export type SystemItemProps = WithChildren<{ system: SystemsResponse; hasShipPresence?: boolean }>
