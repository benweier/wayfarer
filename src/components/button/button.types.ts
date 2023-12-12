import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type ButtonVariantProps } from './button.cva'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & { adornment?: { start?: ReactNode; end?: ReactNode } }
