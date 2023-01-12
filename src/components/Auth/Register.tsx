import { FocusEvent, useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { HiXCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Link } from '@/components/Link'
import { Typography } from '@/components/Typography'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { post } from '@/services/fetch'
import { TokenResponse } from '@/types/spacetraders'
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
  const location = useLocation<Partial<RegisterFormState>>()
  const { ref, isCopied, onCopy, reset } = useCopy()
  const navigate = useNavigate()
  const methods = useForm<RegisterFormState>({
    defaultValues: {
      user: location.state?.user ?? '',
      token: '',
    },
  })
  const { mutateAsync, isLoading, isSuccess } = useMutation((values: RegisterFormState) => {
    const url = new URL(`/users/${values.user}/claim`, 'https://api.spacetraders.io')

    return post<TokenResponse>(url)
  })
  const onSubmit = useCallback<SubmitHandler<RegisterFormState>>(
    (values) => {
      return mutateAsync(values)
        .then((response) => {
          if (!response.data) return

          reset()
          methods.setValue('token', response.data?.token)
          ref.current?.focus()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    [mutateAsync, reset, methods, ref],
  )

  const user = useWatch({ control: methods.control, name: 'user' })
  const token = useWatch({ control: methods.control, name: 'token' })

  return (
    <div css={tw`grid gap-4`}>
      <Typography size="xl" weight="bold" align="center">
        Register
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div css={tw`grid grid-cols-1 gap-6`}>
            <div>
              <Label htmlFor="user">Username</Label>
              <Input type="text" name="user" autoComplete="off" autoFocus />
            </div>
            <div ref={ref}>
              <Label htmlFor="token">Access Token</Label>
              <Input
                type="text"
                name="token"
                onFocus={handleFocus}
                readOnly
                disabled={!token}
                icon={
                  <Copy
                    disabled={!token}
                    onClick={() => {
                      void onCopy(token)
                    }}
                  />
                }
              />
              <Typography size="xs" css={tw`text-gray-300 mt-1`}>
                Register a username to receive your access token
              </Typography>
            </div>

            <div css={tw`grid gap-4`}>
              {isSuccess && (
                <div css={[tw`flex gap-4`, styles.DEFAULT, isCopied && styles.copied, !isCopied && styles.notCopied]}>
                  <HiXCircle size={20} />
                  <Typography as="span" size="sm" nowrap>
                    {isCopied ? 'Token Copied!' : 'Token Not Copied'}
                  </Typography>
                </div>
              )}
              {!isCopied && !token && <Button type="submit">Register</Button>}
              {!!token && (
                <Button
                  disabled={!isCopied}
                  type="button"
                  onClick={() => {
                    navigate(`${ROUTES.AUTH}/${ROUTES.LOGIN}`, { state: { user, token }, replace: true })
                  }}
                >
                  Got it. Let&apos;s go!
                </Button>
              )}
              <Typography size="sm" align="center">
                Already have an access token?&nbsp;
                <Typography
                  as={Link}
                  weight="bold"
                  to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`}
                  state={{ user, token }}
                  css={tw`rounded-sm focus:(ring-2 outline-none ring-emerald-400 ring-offset-2 ring-offset-gray-800)`}
                >
                  Login
                </Typography>
              </Typography>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
