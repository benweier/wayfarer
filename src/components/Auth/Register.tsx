import { FocusEvent, useCallback } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { HiXCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Label } from 'components/Label'
import { Link } from 'components/Link'
import { ROUTES } from 'config/routes'
import { useClaimUserMutation } from 'services/spacetraders/core'
import { Copy } from './Copy'
import { useCopy } from './useCopy'

interface RegisterFormState {
  user: string
  token: string
}

const styles = {
  DEFAULT: [tw`text-gray-500`],
  copied: [tw`text-emerald-400`],
  notCopied: [tw`text-rose-400`],
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
  const [claimUserMutation, { isSuccess }] = useClaimUserMutation()
  const onSubmit = useCallback<SubmitHandler<RegisterFormState>>(
    (values) => {
      return claimUserMutation({ user: values.user })
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
    <div css={tw`grid grid-flow-row gap-4`}>
      <div css={tw`text-xl font-bold text-center`}>Register</div>
      <FormProvider {...methods}>
        <form css={tw`grid grid-cols-1 gap-6`} onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            <Label>Username</Label>
            <Input type="text" name="user" />
          </div>
          <div ref={ref}>
            <Label>Access Token</Label>
            <Input
              type="text"
              name="token"
              onFocus={handleFocus}
              readOnly
              disabled={!token}
              icon={
                <Copy
                  disabled={!token}
                  onClick={async () => {
                    await onCopy(token)
                  }}
                />
              }
            />
            <div css={tw`text-xs text-gray-300 mt-1`}>Register a username to receive your access token</div>
          </div>

          <div css={tw`grid grid-flow-row gap-4`}>
            {isSuccess && (
              <div
                css={[
                  tw`flex items-center space-x-4`,
                  styles.DEFAULT,
                  isCopied && styles.copied,
                  !isCopied && styles.notCopied,
                ]}
              >
                <HiXCircle size={20} />
                <span css={tw`text-sm`}>{isCopied ? 'Token Copied!' : 'Token Not Copied'}</span>
              </div>
            )}
            {!isCopied && !token && <Button type="submit">Register</Button>}
            {!!token && (
              <Button
                disabled={!isCopied}
                type="button"
                onClick={() => {
                  navigate('/auth/login', { state: { token }, replace: true })
                }}
              >
                Let&apos;s go!
              </Button>
            )}
            <div css={tw`text-sm text-center`}>
              Already have an access token?&nbsp;
              <Link css={tw`font-bold`} to={ROUTES.LOGIN} state={{ token }}>
                Login
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
