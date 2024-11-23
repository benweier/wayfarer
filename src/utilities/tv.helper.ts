import { type VariantProps, createTV } from 'tailwind-variants'

export type { VariantProps }

const twMergeConfig = {
  cacheSize: 1000,
}

export const tv = createTV({
  twMergeConfig,
})
