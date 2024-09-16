import { type Action, KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from 'kbar'
import type { PropsWithChildren } from 'react'
import { Results } from './kbar-results.component'

export const KBar = ({ actions, children }: PropsWithChildren<{ actions?: Action[] }>) => {
  return (
    <KBarProvider
      actions={actions}
      options={{
        disableDocumentLock: true,
        disableScrollbarManagement: true,
        toggleShortcut: '/',
      }}
    >
      {children}

      <KBarPortal>
        <KBarPositioner>
          <div className="w-full max-w-[520px] p-4">
            <KBarAnimator>
              <div className="flex flex-col overflow-hidden rounded-lg border border-border-primary bg-background-primary shadow-[0_0_40px_-15px_var(--color-border-secondary)] ring-3 ring-border-primary/30">
                <div className="p-4">
                  <KBarSearch className="input" />
                </div>

                <Results />
              </div>
            </KBarAnimator>
          </div>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  )
}
