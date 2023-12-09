import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Select from '@/components/select'
import { ROUTES } from '@/config/routes'
import { createAgentMutation } from '@/services/api/spacetraders/auth'
import { getFactionListQuery } from '@/services/api/spacetraders/factions'
import { registerSchema } from '@/validators/register.schema'
import { AccessTokenDialog } from './access-token-dialog.component'
import { FactionInfo } from './faction-info.component'
import { type RegisterSchema, registerValidation } from './register.validation'

const AlreadyRegistered = ({ token }: { token?: string }) => {
  const { t } = useTranslation()
  const { control } = useFormContext<RegisterSchema>()
  const symbol = useWatch({ control, name: 'symbol' })

  return (
    <div className="text-caption text-center">
      <Trans
        i18nKey="auth.already_registered"
        components={{
          login_link: (
            <Link className="link" to={ROUTES.LOGIN} state={{ symbol, token }}>
              {t('auth.login', { context: 'text' })}
            </Link>
          ),
        }}
      />
    </div>
  )
}
const FactionField = () => {
  const { t } = useTranslation()
  const methods = useFormContext<RegisterSchema>()
  const { isSuccess, isPending, data } = useQuery({
    queryKey: getFactionListQuery.getQueryKey(),
    queryFn: getFactionListQuery.queryFn,
  })

  if (isPending) {
    return <Select.Skeleton label={<label className="label">{t('faction.label')}</label>} />
  }

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
          label={<Select.Label>{t('faction.label')}</Select.Label>}
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
  const { t } = useTranslation()
  const loc = useLocation()
  const result = registerSchema.safeParse(loc.state)
  const methods = useForm<RegisterSchema>({
    defaultValues: result.success ? result.data : undefined,
    resolver: zodResolver(registerValidation),
  })
  const { mutateAsync, isPending, isSuccess, data } = useMutation({
    mutationKey: createAgentMutation.getMutationKey(),
    mutationFn: createAgentMutation.mutationFn,
  })
  const agent = isSuccess ? data.data : undefined

  return (
    <div className="grid gap-4">
      <div className="text-overline text-center">{t('auth.register_heading')}</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((values) => mutateAsync(values))}>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="label" htmlFor="symbol">
                {t('auth.fields.agent_symbol.label')}
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
                {t('auth.fields.email.label')}{' '}
                <span className="text-secondary text-xs">{t('general.fields.optional')}</span>
              </label>
              <input id="email" {...methods.register('email')} className="input" type="email" autoComplete="off" />
              <div className="text-hint mt-1">
                <Trans
                  i18nKey="auth.fields.email.hint"
                  components={{
                    support_link: (
                      <a
                        href={t('auth.support', { context: 'href' })}
                        target="_blank"
                        className="link"
                        rel="noreferrer noopener"
                      >
                        {t('auth.support', { context: 'text' })}
                      </a>
                    ),
                  }}
                />
              </div>
            </div>

            <div>
              <FactionField />
            </div>

            <QuerySuspenseBoundary>
              <FactionInfo />
            </QuerySuspenseBoundary>

            <Button intent="hero" disabled={isPending} type="submit">
              {t('auth.register', { context: 'action' })}
            </Button>
            <div className="grid gap-4">
              <AlreadyRegistered token={agent?.token} />
            </div>
          </div>
        </form>
      </FormProvider>
      <Modal isOpen={isSuccess} size="md" disableExternalClose>
        {isSuccess && <AccessTokenDialog registration={agent} />}
      </Modal>
    </div>
  )
}
