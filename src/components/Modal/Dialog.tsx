import { ReactNode } from 'react'
import tw from 'twin.macro'
import { ModalProps } from './types.d'

export const Dialog = ({ open, children, render = (children: ReactNode) => <>{children}</> }: ModalProps) => {
  if (!open) return null

  return (
    <div
      css={tw`fixed h-screen w-screen max-h-screen max-w-full bg-gray-800 bg-opacity-75 top-0 z-50 flex justify-center items-center`}
    >
      <div
        tabIndex={0}
        css={[
          tw`fixed w-full h-full max-w-full bg-gray-800 sm:(h-auto rounded-lg maxHeight[600px] max-w-3xl border border-gray-900 shadow-xl)`,
        ]}
        role="dialog"
        aria-modal="true"
      >
        {render(
          <div css={[tw`flex flex-col items-stretch py-4`, tw`maxHeight[80vh]`]}>
            <div css={[tw`flex-auto px-8 py-1 min-h-0`]}>{children}</div>
          </div>,
        )}
      </div>
    </div>
  )
}
