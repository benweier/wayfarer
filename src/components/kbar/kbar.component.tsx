import { KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from 'kbar'
import type { PropsWithChildren } from 'react'
import { Results } from './kbar-results.component'

export const KBar = ({ children }: PropsWithChildren) => {
  return (
    <KBarProvider
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
              <div className="flex flex-col rounded-lg border border-border-primary bg-background-primary ring-3 ring-border-primary/30 overflow-hidden shadow-[0_0_40px_-15px_var(--color-border-secondary)]">
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
