import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useForm } from 'react-hook-form'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipContext } from '@/context/ship.context'
import { createShipWarp } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipTransitActionProps } from './ship-transit.types'

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
  const methods = useForm<{ waypointSymbol: string }>()
  const client = useQueryClient()

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'warp'],
    mutationFn: ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) =>
      createShipWarp({ path: { shipSymbol }, payload: { waypointSymbol: waypointSymbol } }),
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          ['ship', shipSymbol],
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
    onSettled: (_res, _err, { shipSymbol }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })
    },
  })

  return (
    <form
      onSubmit={methods.handleSubmit((values) =>
        mutateAsync({ shipSymbol: ship.symbol, waypointSymbol: values.waypointSymbol }),
      )}
    >
      <fieldset disabled={isLoading || ship.nav.status !== 'IN_ORBIT'} className="grid gap-4">
        <div>
          <label className="label">Waypoint Symbol</label>
          <input {...methods.register('waypointSymbol')} className="input" />
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
