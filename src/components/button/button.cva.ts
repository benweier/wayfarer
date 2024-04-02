import { type VariantProps, cva } from 'class-variance-authority'

export const button = cva('btn', {
  variants: {
    intent: {
      brand: ['btn-brand'],
      info: ['btn-info'],
      success: ['btn-success'],
      warn: ['btn-warning'],
      danger: ['btn-danger'],
      neutral: ['btn-neutral'],
    },
    size: {
      small: ['btn-sm'],
      normal: ['btn-md'],
      large: ['btn-lg'],
    },
    kind: {
      solid: ['btn-solid'],
      flat: ['btn-flat'],
      outline: ['btn-outline'],
    },
    icon: {
      true: ['btn-icon'],
    },
  },
  defaultVariants: {
    intent: 'info',
    kind: 'solid',
    size: 'normal',
  },
})

export type ButtonVariantProps = VariantProps<typeof button>
