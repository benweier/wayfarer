import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getAgentMutation } from '@/services/api/spacetraders/auth'
import { useAuthStore } from '@/store/auth'
import { type LoginSchema, loginValidation } from './login.validation'

export const Login = () => {
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
          message: 'Invalid token',
        })
      }
    },
  })
  const onSubmit = useCallback<SubmitHandler<LoginSchema>>((values) => mutateAsync(values), [mutateAsync])

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
              <input id="symbol" {...methods.register('symbol')} className="input" type="text" />
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
                render={({ message }) => <div className="text-hint text-rose-400">{message}</div>}
              />
            </div>
            <div className="grid gap-4">
              <button className="btn-hero" type="submit" disabled={isPending}>
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
