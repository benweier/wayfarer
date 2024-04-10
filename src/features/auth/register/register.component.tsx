import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Select from '@/components/select'
import { createAgentMutation } from '@/services/api/spacetraders/auth'
import { getFactionListQuery } from '@/services/api/spacetraders/factions'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { AccessTokenDialog } from './access-token-dialog.component'
import { FactionInfo } from './faction-info.component'
import { RegisterSchema } from './register.schema'

const FactionField = () => {
  const { t } = useTranslation()
  const methods = useFormContext<RegisterSchema>()
  const { isPending, data } = useQuery(getFactionListQuery())
  const factions = reduceArrayToMap(
    data?.data.toSorted((a, z) => a.name.localeCompare(z.name)),
    'symbol',
  )

  return (
    <Controller
      control={methods.control}
      name="faction"
      render={({ field }) => {
        return (
          <div>
            <label htmlFor={field.name} className="label">
              {t('faction.label')}
            </label>
            <Select.Field
              id={field.name}
              selected={field.value && <div className="text-foreground-primary">{factions.get(field.value)?.name}</div>}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={
                isPending ? (
                  <div className="bg-background-quaternary my-2 h-2 w-2/3 animate-pulse rounded-full" />
                ) : (
                  <div className="text-foreground-tertiary italic">{t('faction.select_placeholder')}</div>
                )
              }
            >
              {Array.from(factions).map(([key, faction]) => {
                return (
                  <Select.Item key={key} value={faction.symbol}>
                    <div className="flex gap-3">
                      <div>{faction.name}</div>
                      <div className="text-foreground-tertiary">[{faction.symbol}]</div>
                    </div>
                  </Select.Item>
                )
              })}
            </Select.Field>
          </div>
        )
      }}
    />
  )
}

export const Register = () => {
  const { t } = useTranslation()
  const methods = useForm<RegisterSchema>({
    resolver: valibotResolver(RegisterSchema),
  })
  const { mutateAsync, isPending, isSuccess, data } = useMutation({
    mutationKey: createAgentMutation.getMutationKey(),
    mutationFn: createAgentMutation.mutationFn,
  })
  const agent = isSuccess ? data.data : undefined

  return (
    <div className="grid gap-8">
      <div className="display-xs text-center">{t('auth.register_heading')}</div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((values) => mutateAsync(values))}>
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-1">
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

            <div className="space-y-1">
              <label className="label" htmlFor="email">
                {t('auth.fields.email.label')}{' '}
                <span className="text-foreground-tertiary typography-xs font-normal">
                  {t('general.fields.optional')}
                </span>
              </label>
              <input id="email" {...methods.register('email')} className="input" type="email" autoComplete="off" />
              <div className="typography-sm mt-2">
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

            <Button intent="info" size="large" disabled={isPending} type="submit">
              {t('auth.register', { context: 'action' })}
            </Button>
            <div className="grid gap-4">
              <div className="typography-base text-center">
                <Trans
                  i18nKey="auth.already_registered"
                  components={{
                    login_link: (
                      <Link to="/login" className="link">
                        {t('auth.login', { context: 'text' })}
                      </Link>
                    ),
                  }}
                />
              </div>
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
