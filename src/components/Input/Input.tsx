import { InputHTMLAttributes, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import tw from 'twin.macro'
import { Label } from 'components/Label'

export const Input = ({
  label,
  name,
  icon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; name: string; icon?: ReactNode }) => {
  const methods = useFormContext()

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div css={tw`relative rounded-md shadow-sm`}>
        <input
          {...methods.register(name)}
          {...props}
          css={[
            tw`p-3 text-gray-300 bg-gray-600 focus:(ring ring-emerald-400 outline-none) block w-full sm:text-sm rounded-md`,
            icon && tw`pr-10`,
          ]}
        />
        {icon && <div css={tw`absolute inset-y-0 right-0 pr-3 flex items-center`}>{icon}</div>}
      </div>
    </div>
  )
}
