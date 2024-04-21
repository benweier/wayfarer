import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { createShipWarpMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import type { ShipResponse } from '@/types/spacetraders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useForm } from 'react-hook-form'
import type { ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitWarp = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal
      size="md"
      close={<Modal.Close />}
      trigger={<Modal.Trigger disabled={ship.nav.status !== 'IN_ORBIT'}>{trigger}</Modal.Trigger>}
    >
      <Modal.Header>
        <Modal.Title>
          Warp Ship: <span className="font-normal">{ship.symbol}</span>
        </Modal.Title>
      </Modal.Header>

      <QuerySuspenseBoundary>
        <Warp ship={ship} />
      </QuerySuspenseBoundary>
    </Modal>
  )
}

const Warp = ({ ship }: { ship: ShipResponse }) => {
  const methods = useForm<{ waypointSymbol: string }>()
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipWarpMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipWarpMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav = response.data.nav
            draft.data.fuel = response.data.fuel
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
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
          <label className="label" htmlFor="waypointSymbol">
            Waypoint Symbol
          </label>
          <input {...methods.register('waypointSymbol')} className="input" />
        </div>
        <div className="flex justify-end">
          <Button intent="info" type="submit">
            Warp
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
