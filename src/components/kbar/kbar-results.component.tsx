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
            className="group flex items-center text-foreground-secondary typography-sm my-2 px-4"
          >
            {item}
          </div>
        ) : (
          <div
            data-highlighted={active}
            className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted=true]:bg-background-secondary data-[highlighted=true]:text-foreground-primary typography-base relative py-3 px-6 outline-none select-none data-[disabled]:pointer-events-none"
          >
            <div className="flex justify-between gap-8">
              <div className="flex grow justify-between">
                <div>{item.name}</div> <div>{item.children.length > 0 && '>'}</div>
              </div>
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
