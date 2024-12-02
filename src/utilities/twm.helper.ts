import { extendTailwindMerge } from 'tailwind-merge'

export const twm = extendTailwindMerge<'button-size' | 'button-kind' | 'button-intent'>({
  cacheSize: 1000,
  extend: {
    classGroups: {
      'button-size': [{ btn: ['sm', 'md', 'lg'] }],
      'button-kind': [{ btn: ['solid', 'flat', 'outline'] }],
      'button-intent': [{ btn: ['brand', 'info', 'success', 'warning', 'danger', 'neutral'] }],
    },
  },
})
