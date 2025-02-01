import { Drawer } from 'vaul'
import type { DialogDescriptionProps } from '@radix-ui/react-dialog'

export const Description = ({ children, ...props }: DialogDescriptionProps) => {
  return (
    <Drawer.Description {...props} className="text-base text-foreground-secondary">
      {children}
    </Drawer.Description>
  )
}
