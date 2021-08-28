import { useCallback } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { FiHelpCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import tw from 'twin.macro'
import { useClaimUserMutation } from '../../services/spacetraders/core'
import { Button } from '../Button'
import { Input } from '../Input'

export const Register = () => {
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
          <Input type="text" name="user" label="Username" icon={<FiHelpCircle size={20} />} />
        </div>
        <div css={tw`grid grid-flow-col gap-6`}>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </FormProvider>
  )
}
