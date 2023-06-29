import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Modal } from '@/components/modal'
import * as Select from '@/components/select'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/use-location.hook'
import { SpaceTradersResponse, mutationFnFactory } from '@/services/api/spacetraders/core'
import { getFactionsList } from '@/services/api/spacetraders/factions'
import { RegisterAgentRequest, RegisterAgentResponse } from '@/types/spacetraders'
import { AccessTokenDialog } from './access-token-dialog.component'
import { FactionInfo } from './faction-info.component'
import { RegisterSchema, registerValidation } from './register.validation'

const createMyAgent = mutationFnFactory<SpaceTradersResponse<RegisterAgentResponse>, void, RegisterAgentRequest>(
  () => 'register',
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

const FactionField = () => {
  const methods = useFormContext<RegisterSchema>()
  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ['factions'],
    queryFn: ({ signal }) => getFactionsList({ params: { limit: 20 } }, { signal }),
  })

  if (isLoading) return <Select.Skeleton />

  if (!isSuccess) return null

  const factions = data.data
    .map((faction) => ({
      id: faction.symbol,
      name: faction.name,
    }))
    .sort((a, z) => a.name.localeCompare(z.name))

  return (
    <Controller
      control={methods.control}
      name="faction"
      render={({ field }) => (
        <Select.Field
          label={<Select.Label>Faction</Select.Label>}
          by={(a, z) => a?.id === z?.id}
          getItemKey={(item) => item.id}
          getItemLabel={(item) => item?.name}
          getItemOption={(item) => item.name}
          options={factions}
          onChange={(value) => {
            if (value) field.onChange(value.id)
          }}
        />
      )}
    />
  )
}

export const Register = () => {
  const location = useLocation<Partial<RegisterSchema>>()
  const methods = useForm<RegisterSchema>({
    defaultValues: {
      symbol: location.state?.symbol,
    },
    resolver: zodResolver(registerValidation),
  })
  const { mutateAsync, isLoading, isSuccess, data } = useMutation({
    mutationFn: (values: RegisterSchema) => {
      return createMyAgent({ payload: { symbol: values.symbol, faction: values.faction, email: values.email } })
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
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
              />
            </div>

            <div>
              <label className="label" htmlFor="email">
                Email <span className="text-secondary text-xs">(optional)</span>
              </label>
              <input
                id="email"
                {...methods.register('email', { required: true })}
                className="input"
                type="email"
                autoComplete="off"
              />
              <div className="text-hint mt-1">
                If you have reserved your agent symbol by supporting the{' '}
                <a
                  href="https://donate.stripe.com/28o29m5vxcri6OccMM"
                  target="_blank"
                  className="link"
                  rel="noreferrer noopener"
                >
                  SpaceTraders project
                </a>
                , enter the email address you used to reserve it.
              </div>
            </div>

            <div>
              <FactionField />
            </div>

            <FactionInfo />

            <button className="btn-hero" disabled={isLoading} type="submit">
              Register
            </button>
            <div className="grid gap-4">
              <AlreadyRegistered token={agent?.token} />
            </div>
          </div>
        </form>
      </FormProvider>
      <Modal isOpen={isSuccess} size="lg">
        {isSuccess && <AccessTokenDialog registration={agent} />}
      </Modal>
    </div>
  )
}
