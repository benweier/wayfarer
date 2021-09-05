import { FocusEvent, useCallback } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router'
import tw from 'twin.macro'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Link } from 'components/Link'
import { ROUTES } from 'config/routes'
import { useLocation } from 'hooks/useLocation'
import { useClaimUserMutation } from 'services/spacetraders/core'

interface LoginFormState {
  user: string
  token: string
}

const handleFocus = (node: FocusEvent<HTMLInputElement>) => node.target.select()

export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation<Partial<LoginFormState>>()
  const methods = useForm<LoginFormState>({
    defaultValues: {
      user: location.state?.user ?? '',
      token: location.state?.token ?? '',
    },
  })
  const [claimUserMutation] = useClaimUserMutation()
  const onSubmit = useCallback<SubmitHandler<LoginFormState>>(
    (values) => {
      return claimUserMutation(values.user).then(() => {
        navigate('/')
      })
    },
    [claimUserMutation, navigate],
  )

  return (
    <FormProvider {...methods}>
      <form css={tw`grid grid-cols-1 gap-6`} onSubmit={methods.handleSubmit(onSubmit)}>
        <Input label="Username" type="text" name="user" />
        <Input label="Access Token" type="password" name="token" onFocus={handleFocus} />
        <div css={tw`grid grid-flow-row gap-4`}>
          <Button type="submit">Login</Button>
          <div css={tw`text-sm text-center`}>
            Don&apos;t have an access token? <Link to={ROUTES.REGISTER}>Register</Link>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
