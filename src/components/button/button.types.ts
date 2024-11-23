import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ButtonVariantProps } from './button.styles'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & { adornment?: { start?: ReactNode; end?: ReactNode } }
