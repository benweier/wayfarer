import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Link } from '@/components/Link'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { get } from '@/services/fetch'
import { useAuthStore } from '@/services/store/auth'
import { AccountResponse } from '@/types/spacetraders'

interface LoginFormState {
  user: string
  token: string
}

export const Login = () => {
  const location = useLocation<Partial<LoginFormState>>()
  const { setAuth } = useAuthStore()

  const methods = useForm<LoginFormState>({
    defaultValues: {
      user: location.state?.user ?? '',
      token: location.state?.token ?? '',
    },
  })
  const { mutateAsync, isLoading } = useMutation((values: LoginFormState) => {
    const url = new URL('/my/account', 'https://api.spacetraders.io')
    const headers = new Headers()

    if (values.token) headers.set('Authorization', `Bearer ${values.token}`)

    return get<AccountResponse>(url, { headers })
  })
  const onSubmit = useCallback<SubmitHandler<LoginFormState>>(
    (values) => {
      return mutateAsync(values).then((response) => {
        setAuth({ user: response.data?.user, token: values.token })
      })
    },
    [mutateAsync, setAuth],
  )

  const user = useWatch({ control: methods.control, name: 'user' })

  return (
    <div className="grid gap-4">
      <div className="text-overline text-center">Login</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <Label htmlFor="user">Username</Label>
              <Input {...methods.register('user')} type="text" />
              <div className="text-hint mt-1">
                Your username is not required to login, but may be useful with password managers if you have multiple
                accounts
              </div>
            </div>
            <div>
              <Label htmlFor="token">Access Token</Label>
              <Input
                {...methods.register('token')}
                type="password"
                onFocus={(node) => node.target.select()}
                autoFocus
              />
            </div>
            <div className="grid gap-4">
              <Button type="submit" disabled={isLoading}>
                Login
              </Button>
              <div className="text-caption text-center">
                Don&apos;t have an access token?&nbsp;
                <Link to={`${ROUTES.AUTH}/${ROUTES.REGISTER}`} state={{ user }}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
