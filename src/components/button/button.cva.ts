import { type VariantProps, cva } from 'class-variance-authority'

export const button = cva('btn', {
  variants: {
    intent: {
      primary: ['btn-primary'],
      confirm: ['btn-confirm'],
      success: ['btn-success'],
      warn: ['btn-warn'],
      danger: ['btn-danger'],
      dim: ['btn-dim'],
      hero: ['btn-hero'],
    },
    size: {
      small: ['btn-sm'],
      normal: [],
    },
    kind: {
      solid: [],
      flat: ['btn-flat'],
      outline: ['btn-outline'],
    },
    icon: {
      true: ['btn-icon'],
    },
  },
})

export type ButtonVariantProps = VariantProps<typeof button>
