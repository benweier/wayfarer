import { FocusEvent, useCallback } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import tw from 'twin.macro'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Label } from 'components/Label'
import { Link } from 'components/Link'
import { ROUTES } from 'config/routes'
import { useLocation } from 'hooks/useLocation'
import { useLazyMyAccountQuery } from 'services/spacetraders/core'

interface LoginFormState {
  user: string
  token: string
}

const handleFocus = (node: FocusEvent<HTMLInputElement>) => node.target.select()

export const Login = () => {
  const location = useLocation<Partial<LoginFormState>>()

  const methods = useForm<LoginFormState>({
    defaultValues: {
      user: location.state?.user ?? '',
      token: location.state?.token ?? '',
    },
  })
  const [myAccountQuery, { isLoading }] = useLazyMyAccountQuery()
  const onSubmit = useCallback<SubmitHandler<LoginFormState>>(
    (values) => {
      return myAccountQuery({ token: values.token })
    },
    [myAccountQuery],
  )

  return (
    <div css={tw`grid grid-flow-row gap-4`}>
      <div css={tw`text-xl font-bold text-center`}>Login</div>
      <FormProvider {...methods}>
        <form css={tw`grid grid-cols-1 gap-6`} onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="user">Username</Label>
            <Input type="text" name="user" />
            <div css={tw`text-xs text-gray-300 mt-1`}>
              Your username is not required to login, but may be useful with password managers if you have multiple
              accounts
            </div>
          </div>
          <div>
            <Label htmlFor="token">Access Token</Label>
            <Input label="Access Token" type="password" name="token" onFocus={handleFocus} autoFocus />
          </div>
          <div css={tw`grid grid-flow-row gap-4`}>
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
            <div css={tw`text-sm text-center`}>
              Don&apos;t have an access token?&nbsp;
              <Link css={tw`font-bold`} to={ROUTES.REGISTER}>
                Register
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
