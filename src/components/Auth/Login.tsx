import { ErrorMessage } from '@hookform/error-message'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { queryFnFactory } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/services/store/auth'
import { AgentResponse } from '@/types/spacetraders'
import { LoginSchema } from './Login.validation'

const getMyAgent = queryFnFactory<AgentResponse, void>(() => '/my/agent')

export const Login = () => {
  const location = useLocation<Partial<LoginSchema>>()
  const { setAuth } = useAuthStore()

  const methods = useForm<LoginSchema>({
    defaultValues: {
      symbol: location.state?.symbol ?? '',
      token: location.state?.token ?? '',
    },
  })
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values: LoginSchema) => {
      return getMyAgent(undefined, {
        headers: {
          Authorization: `Bearer ${values.token}`,
        },
      })
    },
    cacheTime: 0,
  })
  const onSubmit = useCallback<SubmitHandler<LoginSchema>>(
    (values) => {
      return mutateAsync(values)
        .then((data) => {
          setAuth({ agent: data, token: values.token })
        })
        .catch((err) => {
          if (err.status === 401) {
            methods.setError('token', {
              type: 'manual',
              message: 'Invalid token',
            })
          }
        })
    },
    [methods, mutateAsync, setAuth],
  )

  return (
    <div className="grid gap-4">
      <div className="text-overline text-center">Agent Identification</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="label" htmlFor="symbol">
                Agent Symbol
              </label>
              <input {...methods.register('symbol')} className="input input-lg" type="text" />
              <div className="text-hint mt-1">
                Your symbol is not required to login, but may be useful with password managers if you have multiple
                accounts
              </div>
            </div>
            <div>
              <label className="label" htmlFor="token">
                Access Token
              </label>
              <input
                {...methods.register('token', { required: true })}
                className="input input-lg"
                type="password"
                onFocus={(node) => node.target.select()}
                autoFocus
              />
              <ErrorMessage
                errors={methods.formState.errors}
                name="token"
                render={({ message }) => <div className="text-hint text-rose-400">{message}</div>}
              />
            </div>
            <div className="grid gap-4">
              <button className="btn-hero" type="submit" disabled={isLoading}>
                Log In
              </button>
              <div className="text-caption text-center">
                Don&apos;t have an access token?&nbsp;
                <Link className="link" to={ROUTES.REGISTER}>
                  Register a new agent
                </Link>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
