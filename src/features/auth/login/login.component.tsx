import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/button'
import { ROUTES } from '@/config/routes'
import { getAgentMutation } from '@/services/api/spacetraders/auth'
import { useAuthStore } from '@/store/auth'
import { type LoginSchema, loginValidation } from './login.validation'

export const Login = () => {
  const { t } = useTranslation()
  const loc = useLocation()
  const { signin } = useAuthStore((state) => state.actions)
  const result = loginValidation.safeParse(loc.state)
  const methods = useForm<LoginSchema>({
    defaultValues: result.success ? result.data : undefined,
    resolver: zodResolver(loginValidation),
  })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: getAgentMutation.getMutationKey(),
    mutationFn: getAgentMutation.mutationFn,
    onSuccess: (response, { token }) => {
      signin({ agent: response.data, token: token })
    },
    onError: (err: any) => {
      if (err.status === 401) {
        methods.setError('token', {
          type: 'manual',
          message: t('auth.validation.invalid_token'),
        })
      }
    },
  })
  const onSubmit = useCallback<SubmitHandler<LoginSchema>>((values) => mutateAsync(values), [mutateAsync])

  return (
    <div className="grid gap-4">
      <div className="text-overline text-center">{t('auth.login_heading')}</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="label" htmlFor="symbol">
                {t('auth.fields.agent_symbol.label')}
              </label>
              <input id="symbol" {...methods.register('symbol')} className="input" type="text" />
              <div className="text-hint mt-1">{t('auth.fields.agent_symbol.hint')}</div>
            </div>
            <div>
              <label className="label" htmlFor="token">
                {t('auth.fields.access_token.label')}
              </label>
              <input
                id="token"
                {...methods.register('token', { required: true })}
                className="input"
                type="password"
                onFocus={(node) => {
                  node.target.select()
                }}
                autoFocus
              />
              <ErrorMessage
                errors={methods.formState.errors}
                name="token"
                render={({ message }) => <div className="text-hint text-rose-400">{t(message)}</div>}
              />
            </div>

            <Button intent="hero" type="submit" disabled={isPending}>
              {t('auth.login', { context: 'action' })}
            </Button>

            <div className="text-caption text-center">
              <Trans
                i18nKey="auth.not_registered"
                components={{
                  register_link: (
                    <Link className="link" to={ROUTES.REGISTER}>
                      {t('auth.register', { context: 'text' })}
                    </Link>
                  ),
                }}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
