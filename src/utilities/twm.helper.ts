import { extendTailwindMerge } from 'tailwind-merge'

const COLORS = [
  // Foreground
  'foreground-white',
  'foreground-black',
  'foreground-primary',
  'foreground-secondary',
  'foreground-secondary-hover',
  'foreground-tertiary',
  'foreground-tertiary-hover',
  'foreground-quaternary',
  'foreground-quaternary-hover',
  'foreground-quinary',
  'foreground-quinary-hover',
  'foreground-senary',
  'foreground-disabled',
  'foreground-disabled-subtle',
  'foreground-success-primary',
  'foreground-success-secondary',
  'foreground-warning-primary',
  'foreground-warning-secondary',
  'foreground-error-primary',
  'foreground-error-secondary',
  'foreground-fuel',
  'foreground-cargo',
  'foreground-condition',

  // Background
  'background-primary',
  'background-secondary',
  'background-secondary-hover',
  'background-tertiary',
  'background-quaternary',
  'background-active',
  'background-disabled',
  'background-disabled-subtle',
  'background-overlay',
  'background-success-primary',
  'background-success-secondary',
  'background-warning-primary',
  'background-warning-secondary',
  'background-error-primary',
  'background-error-secondary',
  'background-fuel',
  'background-cargo',
  'background-condition',

  // Border
  'border-primary',
  'border-secondary',
  'border-tertiary',
  'border-disabled',
  'border-disabled-subtle',
  'border-brand',
  'border-error',
]

const FONT_SIZE = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'xs', 'sm', 'base', 'lg', 'xl']

export const twm = extendTailwindMerge<'button-size' | 'button-kind' | 'button-intent'>({
  cacheSize: 1000,
  extend: {
    classGroups: {
      'text-color': [{ text: COLORS }],
      'font-size': [{ text: FONT_SIZE }],
      'bg-color': [{ bg: COLORS }],
      'border-color': [{ border: COLORS }],
      'button-size': [{ btn: ['sm', 'md', 'lg'] }],
      'button-kind': [{ btn: ['solid', 'flat', 'outline'] }],
      'button-intent': [{ btn: ['brand', 'info', 'success', 'warning', 'danger', 'neutral'] }],
    },
  },
})
