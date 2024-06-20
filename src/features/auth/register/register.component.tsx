import { Button } from '@/components/button'
import * as FieldControl from '@/components/field-control'
import * as FormControl from '@/components/form-control'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Select from '@/components/select'
import { createAgentMutation } from '@/services/api/spacetraders/auth'
import { getFactionListQuery } from '@/services/api/spacetraders/factions'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { AccessTokenDialog } from './access-token-dialog.component'
import { FactionInfo } from './faction-info.component'
import { type RegisterFormFieldValues, RegisterSchema } from './register.schema'

const FactionField = () => {
  const { t } = useTranslation()
  const methods = useFormContext<RegisterFormFieldValues>()
  const { isPending, data } = useQuery(getFactionListQuery())
  const factions = reduceArrayToMap(
    data?.data.toSorted((a, z) => a.name.localeCompare(z.name)),
    'symbol',
  )

  return (
    <Controller
      control={methods.control}
      name="faction"
      render={({ field, fieldState, formState }) => {
        const selected = field.value ? factions.get(field.value) : undefined

        return (
          <FieldControl.Root<RegisterFormFieldValues, 'faction'>
            field={field}
            fieldState={fieldState}
            formState={formState}
          >
            <FieldControl.Label>{t('faction.label')}</FieldControl.Label>

            <Select.Field
              id={field.name}
              selected={selected?.name ? <div className="text-foreground-primary">{selected.name}</div> : null}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={
                isPending ? (
                  <div className="bg-background-quaternary my-2 h-2 w-2/3 animate-pulse rounded-full" />
                ) : (
                  t('faction.select_placeholder')
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

            <FieldControl.ErrorMessage />
          </FieldControl.Root>
        )
      }}
    />
  )
}

export const Register = () => {
  const { t } = useTranslation()
  const methods = useForm<RegisterFormFieldValues, any, RegisterSchema>({
    defaultValues: {
      symbol: '',
      email: undefined,
      faction: undefined,
    },
    resolver: valibotResolver(RegisterSchema),
  })
  const { ref, modal } = useModalImperativeHandle()
  const { mutateAsync, isPending, isSuccess, data } = useMutation({
    mutationKey: createAgentMutation.getMutationKey(),
    mutationFn: createAgentMutation.mutationFn,
    onSuccess: () => {
      modal.open()
    },
  })
  const agent = isSuccess ? data.data : undefined

  return (
    <div className="grid gap-8">
      <div className="display-xs text-center">{t('auth.register_heading')}</div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((values) => mutateAsync(values))}>
          <div className="grid grid-cols-1 gap-8">
            <FormControl.Root {...methods.register('symbol', { required: true })}>
              <FormControl.Label>{t('auth.fields.agent_symbol.label')}</FormControl.Label>
              <FormControl.Input type="text" autoComplete="off" />
              <FormControl.ErrorMessage />
            </FormControl.Root>

            <FormControl.Root {...methods.register('email')}>
              <FormControl.Label>
                {t('auth.fields.email.label')}{' '}
                <span className="text-foreground-tertiary typography-xs font-normal">
                  {t('general.fields.optional')}
                </span>
              </FormControl.Label>

              <FormControl.Input type="email" autoComplete="off" />
              <FormControl.ErrorMessage />

              <FormControl.Hint>
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
              </FormControl.Hint>
            </FormControl.Root>

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
      <Modal ref={ref} size="md" disableExternalClose>
        {isSuccess && <AccessTokenDialog registration={agent} />}
      </Modal>
    </div>
  )
}
