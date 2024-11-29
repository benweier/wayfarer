import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { RefAttributes } from 'types-react'
import type { ButtonVariantProps } from './button.styles'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  RefAttributes<HTMLButtonElement> &
  ButtonVariantProps & { asChild?: boolean; adornment?: { start?: ReactNode; end?: ReactNode } }
