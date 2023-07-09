import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useForm } from 'react-hook-form'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipContext } from '@/context/ship.context'
import { createShipWarp } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitWarp = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipContext()

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
  const methods = useForm<{ waypointID: string }>()
  const client = useQueryClient()

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'warp'],
    mutationFn: ({ shipID, waypointID }: { shipID: string; waypointID: string }) =>
      createShipWarp({ path: { shipID }, payload: { waypointSymbol: waypointID } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      return { ship, ships }
    },
    onSuccess: (response, { shipID }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          ['ship', shipID],
          produce(ctx.ship, (draft) => {
            draft.data.nav = response.data.nav
            draft.data.fuel = response.data.fuel
          }),
        )
      }

      if (ctx?.ships && index > -1) {
        client.setQueryData(
          ['ships'],
          produce(ctx.ships, (draft) => {
            draft.data[index].nav = response.data.nav
            draft.data[index].fuel = response.data.fuel
          }),
        )
      }
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return (
    <form
      onSubmit={methods.handleSubmit((values) => mutateAsync({ shipID: ship.symbol, waypointID: values.waypointID }))}
    >
      <fieldset disabled={isLoading || ship.nav.status !== 'IN_ORBIT'} className="grid gap-4">
        <div>
          <label className="label">Waypoint Symbol</label>
          <input {...methods.register('waypointID')} className="input" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Warp
          </button>
        </div>
      </fieldset>
    </form>
  )
}
