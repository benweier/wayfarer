import type { DialogDescriptionProps } from '@radix-ui/react-dialog'
import { Drawer } from 'vaul'

export const Description = ({ children, ...props }: DialogDescriptionProps) => {
  return (
    <Drawer.Description {...props} className="typography-base text-foreground-secondary">
      {children}
    </Drawer.Description>
  )
}
