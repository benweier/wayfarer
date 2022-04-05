import tw from 'twin.macro'

const base = [
  tw`py-2 px-4 text-sm text-gray-300 bg-gray-700 border-2 border-gray-500 shadow-inner block w-full rounded-md`,
  tw`focus:(ring ring-emerald-400 outline-none border-gray-800)`,
]

const disabled = tw`disabled:(bg-gray-700 border-gray-600 opacity-80)`

export const root = tw`relative rounded-md shadow-sm`

export const icon = tw`absolute inset-y-0 right-0 pr-1 flex items-center`

export const input = {
  DEFAULT: [base, disabled],
  icon: tw`pr-10`,
}
