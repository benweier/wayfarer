import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as FieldControl from '@/components/field-control'
import * as FormControl from '@/components/form-control'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Select from '@/components/select'
import { createAgentMutation } from '@/services/api/spacetraders/auth'
import { getFactionListQuery } from '@/services/api/spacetraders/factions'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { AccessTokenDialog } from './access-token-dialog.component'
import { FactionInfo } from './faction-info.component'
import { RegisterSchema } from './register.schema'
import type { RegisterSchemaInput, RegisterSchemaOutput } from './register.schema'

const SupportLink = () => {
  const { t } = useTranslation()

  return (
    <a href={t('auth.support', { context: 'href' })} target="_blank" className="link" rel="noreferrer noopener">
      {t('auth.support', { context: 'text' })}
    </a>
  )
}

const LoginLink = () => {
  const { t } = useTranslation()

  return (
    <Link to="/login" className="link">
      {t('auth.login', { context: 'text' })}
    </Link>
  )
}

const FactionField = () => {
  const { t } = useTranslation()
  const methods = useFormContext<RegisterSchemaInput, any, RegisterSchemaOutput>()
  const { isPending, data } = useQuery(getFactionListQuery())
  const factions = reduceArrayToMap(
    data?.data.toSorted((a, z) => a.name.localeCompare(z.name)),
    'symbol',
  )

  return (
    <FieldControl.Root control={methods.control} name="faction">
      <FieldControl.Label>{t('faction.label')}</FieldControl.Label>

      <FieldControl.Slot<RegisterSchemaInput, 'faction'>>
        {({ field }) => {
          return (
            <Select.Field
              id={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={isPending ? <Select.Pending /> : t('faction.select_placeholder')}
            >
              {Array.from(factions).map(([key, faction]) => {
                return (
                  <Select.Item key={key} value={faction.symbol} textValue={faction.symbol}>
                    <div className="flex gap-3">
                      <div>{faction.name}</div>
                      <div className="text-foreground-tertiary">[{faction.symbol}]</div>
                    </div>
                  </Select.Item>
                )
              })}
            </Select.Field>
          )
        }}
      </FieldControl.Slot>

      <FieldControl.ErrorMessage />
    </FieldControl.Root>
  )
}

export const Register = () => {
  const { t } = useTranslation()
  const methods = useForm<RegisterSchemaInput, any, RegisterSchemaOutput>({
    defaultValues: {
      symbol: '',
      email: '',
      faction: '',
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

  return (
    <div className="grid gap-8">
      <div className="text-h5 text-center">{t('auth.register_heading')}</div>

      <FormProvider {...methods}>
        <form noValidate onSubmit={methods.handleSubmit(mutateAsync)}>
          <div className="grid grid-cols-1 gap-8">
            <FormControl.Root {...methods.register('symbol', { required: true })}>
              <FormControl.Label>{t('auth.fields.agent_symbol.label')}</FormControl.Label>
              <FormControl.Input type="text" autoComplete="off" />
              <FormControl.ErrorMessage />
            </FormControl.Root>

            <FormControl.Root {...methods.register('email')}>
              <FormControl.Label>
                {t('auth.fields.email.label')}{' '}
                <span className="text-xs font-normal text-foreground-tertiary">{t('general.fields.optional')}</span>
              </FormControl.Label>

              <FormControl.Input type="email" autoComplete="off" />
              <FormControl.ErrorMessage />

              <FormControl.Hint>
                <Trans
                  i18nKey="auth.fields.email.hint"
                  components={{
                    support_link: <SupportLink key="support_link" />,
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
              <div className="text-base text-center">
                <Trans
                  i18nKey="auth.already_registered"
                  components={{
                    login_link: <LoginLink key="login_link" />,
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <Modal ref={ref} size="md" disableExternalClose>
        <Modal.Content>{isSuccess && <AccessTokenDialog registration={data.data} />}</Modal.Content>
      </Modal>
    </div>
  )
}
