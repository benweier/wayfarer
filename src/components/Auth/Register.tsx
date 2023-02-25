import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Modal } from '@/components/Modal'
import { SelectField } from '@/components/Select'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { SpaceTradersResponse, mutationFnFactory } from '@/services/api/spacetraders/core'
import { RegisterAgentRequest, RegisterAgentResponse } from '@/types/spacetraders'
import { AccessTokenDialog } from './AccessTokenDialog'
import { RegisterSchema, validation } from './Register.validation'

const createMyAgent = mutationFnFactory<SpaceTradersResponse<RegisterAgentResponse>, void, RegisterAgentRequest>(
  () => '/register',
)

const AlreadyRegistered = ({ token }: { token?: string }) => {
  const { control } = useFormContext<RegisterSchema>()
  const symbol = useWatch({ control, name: 'symbol' })

  return (
    <div className="text-caption text-center">
      Already have an access token?&nbsp;
      <Link className="link" to={ROUTES.LOGIN} state={{ symbol, token }}>
        Log in
      </Link>
    </div>
  )
}

export const Register = () => {
  const location = useLocation<Partial<RegisterSchema>>()
  const methods = useForm<RegisterSchema>({
    defaultValues: {
      symbol: location.state?.symbol,
    },
    resolver: zodResolver(validation),
  })
  const { mutateAsync, isLoading, isSuccess, data } = useMutation({
    mutationFn: (values: RegisterSchema) => {
      return createMyAgent({ payload: { symbol: values.symbol, faction: values.faction } })
    },
    cacheTime: 0,
  })

  const agent = isSuccess ? data?.data : undefined

  return (
    <div className="grid gap-4">
      <div className="text-overline text-center">New Agent Registration</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((values) => mutateAsync(values))}>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="label" htmlFor="symbol">
                Agent Symbol
              </label>
              <input
                id="symbol"
                {...methods.register('symbol', { required: true })}
                className="input input-lg"
                type="text"
                autoComplete="off"
                autoFocus
              />
            </div>
            <div>
              <Controller
                control={methods.control}
                name="faction"
                render={({ field }) => (
                  <SelectField
                    label="Faction"
                    selected={{ id: field.value, name: field.value }}
                    options={[
                      { id: 'COSMIC', name: 'COSMIC' },
                      { id: 'DOMINION', name: 'DOMINION' },
                      { id: 'GALACTIC', name: 'GALACTIC' },
                      { id: 'QUANTUM', name: 'QUANTUM' },
                      { id: 'VOID', name: 'VOID' },
                    ]}
                    onChange={(value) => {
                      field.onChange(value?.id)
                    }}
                  />
                )}
              />
            </div>

            <button className="btn-hero" disabled={isLoading} type="submit">
              Register
            </button>
            <div className="grid gap-4">
              <AlreadyRegistered token={agent?.token} />
            </div>
          </div>
        </form>
      </FormProvider>
      <Modal isOpen={isSuccess}>{isSuccess && <AccessTokenDialog registration={agent} />}</Modal>
    </div>
  )
}
