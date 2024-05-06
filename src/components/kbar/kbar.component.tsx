import { KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from 'kbar'
import type { PropsWithChildren } from 'react'
import { Results } from './kbar-results.component'

export const KBar = ({ children }: PropsWithChildren) => {
  return (
    <KBarProvider>
      {children}

      <KBarPortal>
        <KBarPositioner>
          <div className="w-full max-w-[480px] p-4">
            <KBarAnimator>
              <div className="flex flex-col gap-6 rounded-lg border border-border-primary bg-background-primary p-4 ring-3 ring-border-primary/30">
                <KBarSearch className="input" />

                <Results />
              </div>
            </KBarAnimator>
          </div>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  )
}
