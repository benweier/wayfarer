import { AppIcon } from '@/components/icons'
import type { ButtonHTMLAttributes } from 'react'

export const Collapsible = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className="group typography-sm relative flex w-full select-none items-center justify-between gap-2 rounded-sm bg-background-secondary/50 py-2 pr-8 pl-8 text-foreground-secondary"
      {...props}
    >
      {children}

      <AppIcon id="chevron:down" className="size-4 text-foreground-secondary" aria-hidden />
    </button>
  )
}
