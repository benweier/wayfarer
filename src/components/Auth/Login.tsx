import { FocusEvent, useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import tw from 'twin.macro'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Link } from '@/components/Link'
import { Typography } from '@/components/Typography'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { get } from '@/services/fetch'
import { useAuthStore } from '@/services/store/auth'
import { AccountResponse } from '@/types/spacetraders'

interface LoginFormState {
  user: string
  token: string
}

const handleFocus = (node: FocusEvent<HTMLInputElement>) => node.target.select()

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
    <div css={tw`grid gap-4`}>
      <Typography size="xl" weight="bold" align="center">
        Login
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div css={tw`grid grid-cols-1 gap-6`}>
            <div>
              <Label htmlFor="user">Username</Label>
              <Input type="text" name="user" />
              <Typography size="xs" css={tw`text-gray-300 mt-1`}>
                Your username is not required to login, but may be useful with password managers if you have multiple
                accounts
              </Typography>
            </div>
            <div>
              <Label htmlFor="token">Access Token</Label>
              <Input label="Access Token" type="password" name="token" onFocus={handleFocus} autoFocus />
            </div>
            <div css={tw`grid gap-4`}>
              <Button type="submit" disabled={isLoading}>
                Login
              </Button>
              <Typography size="sm" align="center">
                Don&apos;t have an access token?&nbsp;
                <Typography
                  as={Link}
                  weight="bold"
                  to={`${ROUTES.AUTH}/${ROUTES.REGISTER}`}
                  state={{ user }}
                  css={tw`rounded-sm focus:(ring-2 outline-none ring-emerald-400 ring-offset-2 ring-offset-gray-800)`}
                >
                  Register
                </Typography>
              </Typography>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
