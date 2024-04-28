import type { DialogTitleProps } from '@radix-ui/react-dialog'
import { Drawer } from 'vaul'

export const Title = ({ children, ...props }: DialogTitleProps) => {
  return (
    <Drawer.Title {...props} className="display-xs font-semibold">
      {children}
    </Drawer.Title>
  )
}
