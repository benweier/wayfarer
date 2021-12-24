import tw from 'twin.macro'

export const columnStyles = {
  auto: tw`grid-flow-col`,
  min: tw`auto-cols-min`,
  max: tw`auto-cols-max`,
  fr: tw`auto-cols-fr`,
  1: tw`grid-cols-1`,
  2: tw`grid-cols-2`,
  3: tw`grid-cols-3`,
  4: tw`grid-cols-4`,
  5: tw`grid-cols-5`,
  6: tw`grid-cols-6`,
  7: tw`grid-cols-7`,
  8: tw`grid-cols-8`,
  9: tw`grid-cols-9`,
  10: tw`grid-cols-10`,
  11: tw`grid-cols-11`,
  12: tw`grid-cols-12`,
}

export const rowStyles = {
  auto: tw`grid-flow-row`,
  none: tw`grid-rows-none`,
  min: tw`auto-rows-min`,
  max: tw`auto-rows-max`,
  fr: tw`auto-rows-fr`,
  1: tw`grid-rows-1`,
  2: tw`grid-rows-2`,
  3: tw`grid-rows-3`,
  4: tw`grid-rows-4`,
  5: tw`grid-rows-5`,
  6: tw`grid-rows-6`,
}

export const justifyStyles = {
  start: tw`justify-start`,
  center: tw`justify-center`,
  end: tw`justify-end`,
  between: tw`justify-between`,
  around: tw`justify-around`,
}

export const alignStyles = {
  start: tw`items-start`,
  center: tw`items-center`,
  end: tw`items-end`,
}

export const spacingStyles = {
  px: tw`gap[1px]`,
  1: tw`gap-1`,
  2: tw`gap-2`,
  3: tw`gap-3`,
  4: tw`gap-4`,
  5: tw`gap-5`,
  6: tw`gap-6`,
  7: tw`gap-7`,
  8: tw`gap-8`,
  9: tw`gap-9`,
  10: tw`gap-10`,
  12: tw`gap-12`,
  14: tw`gap-14`,
  16: tw`gap-16`,
}
