import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { HiXCircle } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { post } from '@/services/fetch'
import { TokenResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { Copy } from './Copy'
import { useCopy } from './useCopy'

type RegisterFormState = {
  user: string
  token: string
}

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
    const url = new URL(`/users/${values.user}/claim`, import.meta.env.SPACETRADERS_API_URL)

    return post<TokenResponse>(url)
  })
  const onSubmit = useCallback<SubmitHandler<RegisterFormState>>(
    (values) => {
      return mutateAsync(values)
        .then((response) => {
          if (!response) return

          reset()
          methods.setValue('token', response.token)
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
    <div className="grid gap-4">
      <div className="text-overline text-center">Register</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="label" htmlFor="user">
                Username
              </label>
              <input
                {...methods.register('user', { required: true })}
                className="input input-lg"
                type="text"
                autoComplete="off"
                autoFocus
              />
            </div>
            <div ref={ref}>
              <label className="label" htmlFor="token">
                Access Token
              </label>
              <div className="relative">
                <input
                  {...methods.register('token')}
                  className="input input-lg"
                  type="text"
                  onFocus={(node) => node.target.select()}
                  readOnly
                  disabled={!token}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                  <Copy
                    disabled={!token}
                    onClick={() => {
                      onCopy(token)
                    }}
                  />
                </div>
              </div>
              <div className="text-hint mt-1 text-gray-300">Register a username to receive your access token</div>
            </div>

            <div className="grid gap-4">
              {isSuccess && (
                <div
                  className={cx('flex gap-4', {
                    'text-emerald-600 dark:text-emerald-400': isCopied,
                    'text-rose-600 dark:text-rose-400': !isCopied,
                  })}
                >
                  <HiXCircle size={20} />
                  <span className="text-hint whitespace-nowrap">{isCopied ? 'Token Copied!' : 'Token Not Copied'}</span>
                </div>
              )}
              {!isCopied && !token && (
                <button className="btn-hero" disabled={isLoading} type="submit">
                  Register
                </button>
              )}
              {!!token && (
                <button
                  className="btn-hero"
                  disabled={!isCopied}
                  type="button"
                  onClick={() => {
                    navigate(ROUTES.LOGIN, { state: { user, token }, replace: true })
                  }}
                >
                  Got it. Let&apos;s go!
                </button>
              )}
              <div className="text-caption text-center">
                Already have an access token?&nbsp;
                <Link className="link" to={ROUTES.LOGIN} state={{ user, token }}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
