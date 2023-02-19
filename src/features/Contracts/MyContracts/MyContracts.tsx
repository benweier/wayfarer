import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TRADE_SYMBOL } from '@/config/constants'
import { createContractAccept, getContractsList } from '@/services/api/spacetraders'
import { ContractResponse } from '@/types/spacetraders'

type ContractGroups = {
  available: ContractResponse[]
  accepted: ContractResponse[]
  completed: ContractResponse[]
}

const contractReducer = (result: ContractGroups, contract: ContractResponse) => {
  if (contract.fulfilled) {
    result.completed.push(contract)
    return result
  }

  if (contract.accepted) {
    result.accepted.push(contract)
    return result
  }

  result.available.push(contract)

  return result
}

const getDestinationLabels = (contract: ContractResponse) => {
  return createUniqueSet(contract.terms.deliver.map((item) => item.destinationSymbol))
}

const getDeliveryLabels = (contract: ContractResponse) => {
  return createUniqueSet(contract.terms.deliver.map((item) => item.tradeSymbol))
}

const createUniqueSet = (items: string[]) => {
  const set = new Set(items)

  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

const getStatusLabel = (contract: ContractResponse) => {
  if (contract.fulfilled) return 'Completed'

  if (contract.accepted) return 'Accepted'

  return 'Available'
}

export const MyContracts = () => {
  const client = useQueryClient()
  const { data, isSuccess } = useQuery({
    queryKey: ['contracts'],
    queryFn: ({ signal }) => getContractsList(undefined, { signal }),
    select: (response) => {
      return response.data.reduce(contractReducer, {
        available: [],
        accepted: [],
        completed: [],
      })
    },
  })
  const acceptContract = useMutation({
    mutationFn: (id: string) => createContractAccept({ path: id }),
    onSuccess: () => {
      void client.invalidateQueries(['contracts'])
    },
  })

  if (!isSuccess) return null

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.accepted.length > 0 && (
          <div>
            {data.accepted.map((contract) => {
              const destinations = getDestinationLabels(contract)
              const deliveries = getDeliveryLabels(contract)

              return (
                <div
                  key={contract.id}
                  className="flex flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25"
                >
                  <div>
                    <div className="text-xs font-bold uppercase">{contract.factionSymbol}</div>
                    <div className="text-xs font-medium">{contract.type}</div>
                  </div>
                  <div className="my-2 flex flex-col gap-1">
                    <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Deliver</div>
                    {deliveries.map((delivery) => (
                      <div key={delivery} className="text-sm">
                        {TRADE_SYMBOL[delivery] ?? delivery}
                      </div>
                    ))}
                  </div>
                  <div className="my-2 flex flex-col gap-1">
                    <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Destination</div>
                    {destinations.map((destination) => (
                      <div key={destination} className="text-sm">
                        {destination}
                      </div>
                    ))}
                  </div>
                  <div className="my-2 flex flex-col gap-1 text-sm">Status: {getStatusLabel(contract)}</div>
                  <div>
                    <button className="btn btn-confirm w-full" onClick={() => acceptContract.mutate(contract.id)}>
                      Deliver Contract
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {data.available.map((contract) => {
          const destinations = getDestinationLabels(contract)

          return (
            <div
              key={contract.id}
              className="flex flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25"
            >
              <div>
                <div className="text-xs font-bold uppercase">{contract.factionSymbol}</div>
                <div className="text-xs font-medium">{contract.type}</div>
              </div>
              <div className="text-xs font-bold">Deliver</div>
              <div className="my-2 flex flex-col gap-1"></div>
              <div className="my-2 flex flex-col gap-1">
                <div className="text-xs font-bold text-zinc-300">Destination</div>
                {destinations.map((destination) => (
                  <div key={destination} className="text-sm">
                    {destination}
                  </div>
                ))}
              </div>
              <div className="my-2 flex flex-col gap-1">Status: {getStatusLabel(contract)}</div>
              <div>
                <button className="btn btn-confirm w-full" onClick={() => acceptContract.mutate(contract.id)}>
                  Accept Contract
                </button>
              </div>
            </div>
          )
        })}
        {/* {completed.length > 0 && (
          <div>
            {completed.map((contract) => (
              <div key={contract.id} className="rounded bg-zinc-700/25 py-2 px-3">
                <div className="flex flex-row items-center justify-between gap-2">
                  <div>{contract.type}</div>
                  <div className="text-hint uppercase">{contract.factionSymbol}</div>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </>
  )
}
