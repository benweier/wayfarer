import { useNavigate } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { type RegisterAgentResponse } from '@/types/spacetraders'
import { Copy } from './copy-button.component'
import { useCopy } from './use-copy.hook'

export const AccessTokenDialog = ({ registration }: { registration?: RegisterAgentResponse }) => {
  const navigate = useNavigate()
  const { onCopy, isCopied } = useCopy()

  if (!registration) return null

  return (
    <div className="grid gap-8">
      <div className="display-md text-center font-bold">
        Welcome, <span className="font-bold">{registration.agent.symbol}</span>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="display-xs text-center">Access Token</h2>
          <div>
            <div className="relative">
              <input
                className="input pr-11"
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
                'text-foreground-success-primary': isCopied,
                'text-foreground-error-primary': !isCopied,
              })}
            >
              {isCopied ? <AppIcon id="check" className="size-5" /> : <AppIcon id="cancel" className="size-5" />}

              <span className="typography-base whitespace-nowrap">
                {isCopied ? 'Token Copied!' : 'Token Not Copied'}
              </span>
            </div>
          </div>
        </div>
        <div className="text-foreground-warning-primary flex items-center justify-center gap-2">
          <div>
            <AppIcon id="alert" className="size-6" />
          </div>

          <span className="typography-lg font-semibold">
            Your access token cannot be retrieved if you lose it. Please save it somewhere safe, like a password
            manager, before proceeding!
          </span>
        </div>
      </div>
      <div>
        <Button
          intent="info"
          className="w-full"
          disabled={!isCopied}
          type="button"
          onClick={() => {
            void navigate({ to: '/login' })
          }}
        >
          Got it. Let&apos;s go!
        </Button>
      </div>
    </div>
  )
}
