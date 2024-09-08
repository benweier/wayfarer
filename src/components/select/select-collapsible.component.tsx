import { AppIcon } from '@/components/icons'
import type { ButtonHTMLAttributes } from 'react'

export const Collapsible = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className="group w-full text-foreground-secondary bg-background-secondary/50 typography-sm relative flex items-center justify-between gap-2 py-2 pr-8 pl-8 rounded-sm select-none"
      {...props}
    >
      {children}

      <AppIcon id="chevron:down" className="text-foreground-secondary size-4" aria-hidden />
    </button>
  )
}
