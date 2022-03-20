import { KeyboardEvent, createContext, useCallback, useContext, useRef } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext, useWatch } from 'react-hook-form'
import { HiMinus, HiOutlineCash, HiPlus } from 'react-icons/hi'
import tw, { theme } from 'twin.macro'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ShipSelect } from '@/components/Ships/Select'
import { usePurchaseGoodsMutation } from '@/services/spacetraders/core'
import { Marketplace, YourShip } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'

type PurchaseGoodsFormState = { ship: YourShip; qty: string }

const PurchaseGoodsContext = createContext<{ ships: YourShip[]; marketplace?: Marketplace }>({
  ships: [],
  marketplace: undefined,
})

const GoodsQuantity = ({ min = 0, max = 0 }: { min?: number; max?: number }) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const handleIncrement = useCallback((step: number) => {
    if (ref.current) {
      ref.current.stepUp(step)
      ref.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, [])

  const handleDecrement = useCallback((step: number) => {
    if (ref.current) {
      ref.current.stepDown(step)
      ref.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, [])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Backspace') return

    const characterNumber = Number(event.key)

    if (characterNumber >= 0 && characterNumber <= 9) {
      return
    }

    event.preventDefault()
  }, [])

  return (
    <div css={tw`grid grid-cols-3 gap-2`}>
      <div css={tw`grid grid-cols-3 gap-2`}>
        <Button css={tw`p-1`} onClick={() => handleDecrement(100)}>
          <span css={tw`flex justify-center items-center`}>
            <HiMinus size={12} /> 100
          </span>
        </Button>
        <Button css={tw`p-1`} onClick={() => handleDecrement(10)}>
          <span css={tw`flex justify-center items-center`}>
            <HiMinus size={12} /> 10
          </span>
        </Button>
        <Button css={tw`p-1`} onClick={() => handleDecrement(1)}>
          <span css={tw`flex justify-center items-center`}>
            <HiMinus size={12} /> 1
          </span>
        </Button>
      </div>
      <div>
        <Input
          ref={ref}
          name="qty"
          type="number"
          step={1}
          min={min}
          max={max}
          css={tw`text-center`}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div css={tw`grid grid-cols-3 gap-2`}>
        <Button css={tw`p-1`} onClick={() => handleIncrement(1)}>
          <span css={tw`flex justify-center items-center`}>
            <HiPlus size={12} /> 1
          </span>
        </Button>
        <Button css={tw`p-1`} onClick={() => handleIncrement(10)}>
          <span css={tw`flex justify-center items-center`}>
            <HiPlus size={12} /> 10
          </span>
        </Button>
        <Button css={tw`p-1`} onClick={() => handleIncrement(100)}>
          <span css={tw`flex justify-center items-center`}>
            <HiPlus size={12} /> 100
          </span>
        </Button>
      </div>
    </div>
  )
}

const GoodsPurchasePrice = ({ marketplace }: { marketplace: Marketplace }) => {
  const { control } = useFormContext<PurchaseGoodsFormState>()
  const qty = useWatch({ control, name: 'qty' })

  return (
    <div css={tw`flex gap-2 justify-center items-center`}>
      <HiOutlineCash size={20} color={theme`colors.emerald.400`} />
      <span css={tw`font-bold`}>{formatNumber(marketplace.pricePerUnit * Number(qty))}</span>
    </div>
  )
}

const PurchaseGoodsForm = ({
  onDone,
  onCancel,
}: {
  onDone: SubmitHandler<PurchaseGoodsFormState>
  onCancel: () => void
}) => {
  const methods = useForm<PurchaseGoodsFormState>({
    defaultValues: {
      ship: undefined,
      qty: '0',
    },
  })
  const { ships, marketplace } = useContext(PurchaseGoodsContext)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onDone)}>
        <fieldset disabled={methods.formState.isSubmitting}>
          <div css={tw`grid grid-flow-row gap-4 p-4`}>
            <div>
              <Controller
                control={methods.control}
                name="ship"
                render={({ field }) => (
                  <ShipSelect
                    ships={ships}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                  />
                )}
              />
            </div>
            <div>
              <GoodsQuantity min={0} max={marketplace?.quantityAvailable} />
            </div>
            <div css={tw`text-center`}>{marketplace && <GoodsPurchasePrice marketplace={marketplace} />}</div>
          </div>
          <div css={tw`border-t border-gray-900`}>
            <div css={tw`grid grid-flow-col gap-2 bg-gray-900 p-2 rounded-b-lg`}>
              <Button type="submit" disabled={!marketplace}>
                CONFIRM
              </Button>
              <Button onClick={onCancel} css={tw`bg-gray-800 ring-rose-500`}>
                CANCEL
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  )
}

export const PurchaseGoods = ({
  ships,
  marketplace,
  onDone,
  onCancel,
}: {
  ships: YourShip[]
  marketplace: Marketplace
  onDone: () => void
  onCancel: () => void
}) => {
  const [purchaseGoodsMutation] = usePurchaseGoodsMutation()

  const handlePurchase = useCallback(
    async ({ ship, marketplace }: { ship: YourShip; marketplace: Marketplace }) =>
      purchaseGoodsMutation({ good: marketplace.symbol, ship: ship.id }),
    [purchaseGoodsMutation],
  )

  return (
    <PurchaseGoodsContext.Provider value={{ ships, marketplace }}>
      <PurchaseGoodsForm
        onDone={({ ship }) => handlePurchase({ ship, marketplace }).then(onDone)}
        onCancel={onCancel}
      />
    </PurchaseGoodsContext.Provider>
  )
}
