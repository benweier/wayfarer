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
            className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted=true]:bg-background-tertiary data-[highlighted=true]:text-foreground-primary typography-sm relative flex items-center gap-2 rounded-md py-2 pr-16 pl-8 outline-none select-none data-[disabled]:pointer-events-none"
          >
            {item}
          </div>
        ) : (
          <div
            data-highlighted={active}
            className="group flex flex-row justify-between text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted=true]:bg-background-tertiary data-[highlighted=true]:text-foreground-primary typography-sm relative flex items-center gap-2 rounded-md py-3 px-6 outline-none select-none data-[disabled]:pointer-events-none"
          >
            {item.name}
            {item.shortcut && (
              <div dir="ltr">
                {item.shortcut.map((shortcut, index) => {
                  // Shortcut keys may be repeated, so aad the index to be unique
                  const key = `${shortcut}-${index}`
                  return <Kbd key={key}>{shortcut}</Kbd>
                })}
              </div>
            )}
          </div>
        )
      }
    />
  )
}
