import { useNavigate } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { loginRoute } from '@/routes/auth.route'
import { type RegisterAgentResponse } from '@/types/spacetraders'
import { Copy } from './copy-button.component'
import { useCopy } from './use-copy.hook'

export const AccessTokenDialog = ({ registration }: { registration?: RegisterAgentResponse }) => {
  const navigate = useNavigate()
  const { onCopy, isCopied } = useCopy()

  if (!registration) return null

  return (
    <div className="grid gap-8">
      <div className="text-subtitle text-center">
        Welcome, <span className="font-bold">{registration.agent.symbol}</span>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-overline text-center">Access Token</h2>
          <div>
            <div className="relative">
              <input
                className="input-lg input pr-11"
                name="token"
                type="text"
                value={registration.token}
                onFocus={(event) => {
                  event.target.select()
                }}
                readOnly
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                <Copy
                  onClick={() => {
                    void onCopy(registration.token)
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div
              className={cx('flex items-center justify-center gap-2', {
                'text-emerald-600 dark:text-emerald-400': isCopied,
                'text-rose-600 dark:text-rose-400': !isCopied,
              })}
            >
              {isCopied ? <AppIcon id="check" className="size-5" /> : <AppIcon id="cancel" className="size-5" />}

              <span className="text-caption whitespace-nowrap">{isCopied ? 'Token Copied!' : 'Token Not Copied'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
          <div>
            <AppIcon id="alert" className="size-6" />
          </div>

          <span className="text-base font-semibold">
            Your access token cannot be retrieved if you lose it. Please save it somewhere safe, like a password
            manager, before proceeding!
          </span>
        </div>
      </div>
      <div>
        <Button
          intent="primary"
          className="w-full"
          disabled={!isCopied}
          type="button"
          onClick={() => {
            void navigate({ to: loginRoute })
          }}
        >
          Got it. Let&apos;s go!
        </Button>
      </div>
    </div>
  )
}
