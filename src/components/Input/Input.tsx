import { InputHTMLAttributes, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import tw from 'twin.macro'

const styles = {
  DEFAULT: [tw`py-2 px-4 text-gray-300 bg-gray-600 focus:(ring ring-emerald-400 outline-none) block w-full rounded-md`],
  disabled: [tw`disabled:(bg-gray-700)`],
}

export const Input = ({
  name,
  icon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; name: string; icon?: ReactNode }) => {
  const methods = useFormContext()

  return (
    <div css={tw`relative rounded-md shadow-sm`}>
      <input {...methods.register(name)} {...props} css={[styles.DEFAULT, styles.disabled, icon && tw`pr-10`]} />
      {icon && <div css={tw`absolute inset-y-0 right-0 pr-2 flex items-center`}>{icon}</div>}
    </div>
  )
}
