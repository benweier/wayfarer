import tw, { styled } from 'twin.macro'

const styles = {
  DEFAULT: [
    tw`w-full text-sm font-bold bg-blue-500 leading-none px-5 py-3 rounded outline-none`,
    tw`ring-emerald-400 ring-offset-2 ring-offset-gray-800`,
    tw`focus:(outline-none ring)`,
  ],
  disabled: tw`disabled:(opacity-50 cursor-default)`,
}

export const Button = styled.button(() => [styles.DEFAULT, styles.disabled])
