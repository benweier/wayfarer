import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import tw from 'twin.macro'
import { isFunction } from '@/utilities/is-function'

const styles = {
  DEFAULT: [
    tw`py-2 px-4 text-sm text-gray-300 bg-gray-700 border-2 border-gray-500 shadow-inner block w-full rounded-md`,
    tw`focus:(ring ring-emerald-400 outline-none border-gray-800)`,
  ],
  disabled: [tw`disabled:(bg-gray-700 border-gray-600 opacity-80)`],
}

export const InternalInput = (
  { name, icon, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; name: string; icon?: ReactNode },
  ref: ForwardedRef<HTMLInputElement | null> | null,
) => {
  const { register } = useFormContext()
  const input = register(name)

  return (
    <div css={tw`relative rounded-md shadow-sm`}>
      <input
        {...input}
        ref={(node) => {
          input.ref(node)

          if (ref) {
            isFunction(ref) ? ref(node) : (ref.current = node)
          }
        }}
        {...props}
        css={[styles.DEFAULT, styles.disabled, icon && tw`pr-10`]}
      />
      {icon && <div css={tw`absolute inset-y-0 right-0 pr-1 flex items-center`}>{icon}</div>}
    </div>
  )
}

export const Input = forwardRef(InternalInput)
