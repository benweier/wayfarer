import { FocusEvent, useCallback } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router'
import tw from 'twin.macro'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Link } from 'components/Link'
import { ROUTES } from 'config/routes'
import { useClaimUserMutation } from 'services/spacetraders/core'
import { Copy } from './Copy'
import { useCopy } from './useCopy'

interface RegisterFormState {
  user: string
  token: string
}

const handleFocus = (node: FocusEvent<HTMLInputElement>) => node.target.select()

export const Register = () => {
  const { ref, isCopied, onCopy, reset } = useCopy()
  const navigate = useNavigate()
  const methods = useForm<RegisterFormState>({
    defaultValues: {
      token: '',
    },
  })
  const [claimUserMutation] = useClaimUserMutation()
  const onSubmit = useCallback<SubmitHandler<RegisterFormState>>(
    (values) => {
      return claimUserMutation(values.user)
        .unwrap()
        .then((response) => {
          reset()
          methods.setValue('token', response.token)
          ref.current?.focus()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    [claimUserMutation, methods, reset, ref],
  )

  const token = methods.watch('token')

  return (
    <FormProvider {...methods}>
      <form css={tw`grid grid-cols-1 gap-6`} onSubmit={methods.handleSubmit(onSubmit)}>
        <Input type="text" name="user" label="Username" />
        <div ref={ref}>
          <Input
            type="text"
            name="token"
            label="Access Token"
            onFocus={handleFocus}
            readOnly
            icon={
              <Copy
                disabled={!token}
                onClick={async () => {
                  await onCopy(token)
                }}
              />
            }
          />
        </div>

        <div css={tw`grid grid-flow-row gap-4`}>
          {!isCopied && !token && <Button type="submit">Register</Button>}
          {!!token && (
            <Button
              disabled={!isCopied}
              type="button"
              onClick={() => {
                navigate('/auth/login', { state: { token } })
              }}
            >
              Let&apos;s go!
            </Button>
          )}
          <div css={tw`text-sm text-center`}>
            Already have an access token?{' '}
            <Link to={ROUTES.LOGIN} state={{ token }}>
              Login
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
