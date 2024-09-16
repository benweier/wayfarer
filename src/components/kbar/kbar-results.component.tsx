import { Kbd } from '@/components/kbd'
import { KBarResults, useMatches } from 'kbar'

export function Results() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div
            data-highlighted={active}
            className="group typography-sm my-2 flex items-center px-4 text-foreground-secondary"
          >
            {item}
          </div>
        ) : (
          <div
            data-highlighted={active}
            className="group typography-base relative select-none px-6 py-3 text-foreground-secondary outline-none data-[disabled]:pointer-events-none data-[highlighted=true]:bg-background-secondary data-[disabled]:text-foreground-disabled data-[highlighted=true]:text-foreground-primary"
          >
            <div className="flex justify-between gap-8">
              <div className="grow">{item.name}</div>
              {item.shortcut && (
                <div dir="ltr" className="shrink">
                  {item.shortcut.map((shortcut, index) => {
                    // Shortcut keys may be repeated, so aad the index to be unique
                    const key = `${shortcut}-${index}`
                    return <Kbd key={key}>{shortcut}</Kbd>
                  })}
                </div>
              )}
            </div>
          </div>
        )
      }
    />
  )
}
