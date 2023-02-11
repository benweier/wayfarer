import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/routes'
import { RegisterAgentResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { Dialog } from '../Modal'
import { Copy } from './Copy'
import { useCopy } from './useCopy'

export const AccessTokenDialog = ({ registration }: { registration?: RegisterAgentResponse }) => {
  const navigate = useNavigate()
  const { onCopy, isCopied } = useCopy()

  if (!registration) return null

  return (
    <Dialog size="md">
      <Dialog.Title>
        <div className="text-subtitle text-center">
          Welcome, <span className="font-bold">{registration.agent.symbol}</span>
        </div>
      </Dialog.Title>
      <Dialog.Content>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h2 className="text-overline text-center">Access Token</h2>
            <div>
              <div className="relative">
                <input
                  className="input input-lg pr-11"
                  name="token"
                  type="text"
                  value={registration.token}
                  onFocus={(event) => event.target.select()}
                  readOnly
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                  <Copy
                    onClick={() => {
                      onCopy(registration.token)
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
                {isCopied ? <CheckCircleIcon className="h-5 w-5" /> : <XCircleIcon className="h-5 w-5" />}

                <span className="text-caption whitespace-nowrap">
                  {isCopied ? 'Token Copied!' : 'Token Not Copied'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
      <Dialog.Actions>
        <div className="p-4">
          <button
            className="btn btn-primary w-full"
            disabled={!isCopied}
            type="button"
            onClick={() => {
              navigate(ROUTES.LOGIN, { state: { symbol: registration.agent.symbol, token: registration.token } })
            }}
          >
            Got it. Let&apos;s go!
          </button>
        </div>
      </Dialog.Actions>
    </Dialog>
  )
}
