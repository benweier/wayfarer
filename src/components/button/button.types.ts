import type { ButtonVariantProps } from './button.styles'
import type { ButtonHTMLAttributes, ReactNode, RefAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  RefAttributes<HTMLButtonElement> &
  ButtonVariantProps & { asChild?: boolean; adornment?: { start?: ReactNode; end?: ReactNode } }
