import { HiOutlineDuplicate } from 'react-icons/hi'
import tw, { styled } from 'twin.macro'

export const Copy = styled.button.attrs({ type: 'button', children: <HiOutlineDuplicate size={24} /> })(
  tw`text-gray-300 p-1.5 rounded cursor-default border-0`,
  tw`not-disabled:(hover:(text-blue-400 cursor-pointer))`,
  tw`focus:(ring ring-inset ring-blue-500 outline-none)`,
  tw`disabled:(opacity-50)`,
)
