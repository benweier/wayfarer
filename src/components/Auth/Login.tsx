import { useCallback } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router'
import tw from 'twin.macro'
import { useClaimUserMutation } from '../../services/spacetraders/core'
import { Button } from '../Button'
import { Input } from '../Input'

export const Login = () => {
  const navigate = useNavigate()
  const methods = useForm<{ user: string; token: string }>()
  const [claimUserMutation] = useClaimUserMutation()
  const onSubmit = useCallback<SubmitHandler<{ user: string; token: string }>>(
    (values) => {
      return claimUserMutation(values.user).then(() => {
        navigate('/')
      })
    },
    [claimUserMutation, navigate],
  )

  return (
    <FormProvider {...methods}>
      <form css={tw`contents`} onSubmit={methods.handleSubmit(onSubmit)}>
        <div css={tw`grid grid-cols-1 gap-6`}>
          <Input label="Access Token" type="password" name="token" onFocus={(node) => node.target.select()} />
        </div>
        <div css={tw`grid grid-flow-col gap-6`}>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </FormProvider>
  )
}
