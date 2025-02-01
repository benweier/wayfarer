import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router'
import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as FormControl from '@/components/form-control'
import { toast } from '@/components/toast'
import { ROUTES } from '@/config/routes'
import { getAgentMutation } from '@/services/api/spacetraders/auth'
import { StatusCode, isHttpErrorResponse } from '@/services/http'
import { useAuthStore } from '@/store/auth'
import { LoginSchema } from './login.schema'
import type { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import type { AgentResponse } from '@/types/spacetraders'

const api = getRouteApi(ROUTES.LOGIN)

const RegisterLink = () => {
  const { t } = useTranslation()

  return (
    <Link to="/register" className="link">
      {t('auth.register', { context: 'text' })}
    </Link>
  )
}

export const Login = () => {
  const [isTransitionPending, startTransition] = useTransition()
  const { redirect } = api.useSearch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const signin = useAuthStore((state) => state.actions.signin)
  const methods = useForm<LoginSchema>({
    resolver: valibotResolver(LoginSchema),
  })

  const onSuccessHandler = (response: SpaceTradersResponse<AgentResponse>, variables: { token: string }) => {
    toast.success({
      title: t('auth.toast.login_success_title'),
    })
    startTransition(async () => {
      signin({ agent: response.data, token: variables.token })
      await navigate({ to: redirect === undefined ? '/fleet' : redirect })
    })
  }
  const { mutateAsync, isPending } = useMutation({
    mutationKey: getAgentMutation.getMutationKey(),
    mutationFn: getAgentMutation.mutationFn,
    onSuccess: onSuccessHandler,
    onError: (err) => {
      toast.error({
        title: t('auth.toast.login_error_title'),
        description: t('auth.toast.login_error_description'),
      })
      if (isHttpErrorResponse(err, StatusCode.Unauthorized)) {
        methods.setError('token', {
          type: 'manual',
          message: t('auth.validation.invalid_token'),
        })
      }
    },
  })

  return (
    <div className="grid gap-8">
      <div className="text-h5 text-center">{t('auth.login_heading')}</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((values) => mutateAsync(values))}>
          <div className="grid grid-cols-1 gap-8">
            <FormControl.Root {...methods.register('symbol')}>
              <FormControl.Label>{t('auth.fields.agent_symbol.label')}</FormControl.Label>
              <FormControl.Input type="text" />
              <FormControl.Hint>{t('auth.fields.agent_symbol.hint')}</FormControl.Hint>
            </FormControl.Root>

            <FormControl.Root {...methods.register('token', { required: true })}>
              <FormControl.Label>{t('auth.fields.access_token.label')}</FormControl.Label>
              <FormControl.Input
                type="password"
                onFocus={(node) => {
                  node.target.select()
                }}
              />
              <FormControl.ErrorMessage />
            </FormControl.Root>

            <Button intent="info" size="large" type="submit" disabled={isPending || isTransitionPending}>
              {t('auth.login', { context: 'action' })}
            </Button>

            <div className="text-base text-center">
              <Trans
                i18nKey="auth.not_registered"
                components={{
                  register_link: <RegisterLink key="register_link" />,
                }}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
