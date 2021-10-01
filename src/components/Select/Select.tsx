import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiSelector } from 'react-icons/hi'
import tw, { styled, theme } from 'twin.macro'
import { Label } from 'components/Label'

interface SelectOption {
  id: string
  name: string
}

const StyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition duration-100 ease-out`};
  }

  &.enterFrom {
    ${tw`transform scale-95 opacity-0`};
  }

  &.enterTo {
    ${tw`transform scale-100 opacity-100`};
  }

  &.leave {
    ${tw`transition duration-100 ease-out`};
  }

  &.leaveFrom {
    ${tw`transform scale-100 opacity-100`};
  }

  &.leaveTo {
    ${tw`transform scale-95 opacity-0`};
  }
`

export const Select = ({
  label,
  selected,
  options = [],
  onChange,
}: {
  label: string
  selected?: SelectOption
  options?: SelectOption[]
  onChange: (value?: SelectOption) => void
}) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <>
        <Listbox.Label as={Label}>{label}</Listbox.Label>
        <div css={tw`mt-1 relative`}>
          <Listbox.Button
            css={[
              tw`text-sm bg-gray-700 relative w-full border-2 border-gray-500 shadow-inner rounded-md pl-4 pr-10 py-2 text-left cursor-default`,
              tw`focus:(ring ring-emerald-400 outline-none border-gray-800)`,
            ]}
          >
            <span css={tw`block truncate font-semibold`}>{selected?.name}</span>
            <span css={tw`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none`}>
              <HiSelector size={20} color={theme`colors.gray.400`} aria-hidden="true" />
            </span>
          </Listbox.Button>

          <StyledTransition
            enter="enter"
            enterFrom="enterFrom"
            enterTo="enterTo"
            leave="leave"
            leaveFrom="leaveFrom"
            leaveTo="leaveTo"
          >
            <Listbox.Options
              static
              css={[
                tw`absolute z-10 mt-1 w-full bg-gray-700 max-h-60 rounded-md text-sm overflow-auto outline-none`,
                tw`focus:(ring-2 ring-emerald-400)`,
              ]}
            >
              {options.map((option) => (
                <Listbox.Option key={option.id} value={option} css={tw`relative`}>
                  {({ selected, active }) => (
                    <>
                      <span
                        css={[
                          tw`m-1 rounded cursor-default select-none relative py-2 pl-3 pr-9 block truncate`,
                          active && tw`bg-gray-600`,
                        ]}
                      >
                        {option.name}
                      </span>

                      {selected ? (
                        <span css={[tw`absolute inset-y-0 right-0 flex items-center pr-4`]}>
                          <HiCheck size={20} aria-hidden="true" color={theme`colors.emerald.400`} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </StyledTransition>
        </div>
      </>
    </Listbox>
  )
}
