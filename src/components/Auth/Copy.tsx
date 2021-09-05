import { HiOutlineDuplicate } from 'react-icons/hi'
import tw, { styled } from 'twin.macro'

export const Copy = styled.button.attrs({ type: 'button', children: <HiOutlineDuplicate size={24} /> })(
  tw`text-gray-300 p-1 -m-1 rounded-md cursor-default border-0 not-disabled:(hover:(text-blue-400 cursor-pointer)) focus:(ring ring-blue-500 outline-none) disabled:(opacity-50)`,
)
