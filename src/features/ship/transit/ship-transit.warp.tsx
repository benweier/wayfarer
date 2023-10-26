import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { createShipWarpMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitWarp = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal size="md" closeable trigger={<Modal.Trigger>{trigger}</Modal.Trigger>}>
      <div className="grid gap-8">
        <h3 className="text-title">
          Warp Ship: <span className="font-normal">{ship.symbol}</span>
        </h3>
        <QuerySuspenseBoundary>
          <Warp ship={ship} />
        </QuerySuspenseBoundary>
      </div>
    </Modal>
  )
}

const Warp = ({ ship }: { ship: ShipResponse }) => {
  const methods = useForm<{ waypointSymbol: string }>()
  const client = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipWarpMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipWarpMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.nav = response.data.nav
            draft.data.fuel = response.data.fuel
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].nav = response.data.nav
            draft.data[index].fuel = response.data.fuel
          }),
        )
      }
    },
  })

  return (
    <form
      onSubmit={methods.handleSubmit((values) =>
        mutateAsync({ shipSymbol: ship.symbol, waypointSymbol: values.waypointSymbol }),
      )}
    >
      <fieldset disabled={isPending || ship.nav.status !== 'IN_ORBIT'} className="grid gap-4">
        <div>
          <label className="label">Waypoint Symbol</label>
          <input {...methods.register('waypointSymbol')} className="input" />
        </div>
        <div className="flex justify-end">
          <Button intent="primary" type="submit">
            Warp
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
