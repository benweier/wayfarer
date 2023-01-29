import { KeyboardEvent, createContext, useCallback, useContext, useRef } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext, useWatch } from 'react-hook-form'
import { HiMinus, HiOutlineCash, HiPlus } from 'react-icons/hi'
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
    <div className="grid grid-cols-3 gap-2">
      <div className="grid grid-cols-3 gap-2">
        <button className="btn btn-primary p-1" onClick={() => handleDecrement(100)}>
          <span className="flex items-center justify-center">
            <HiMinus size={12} /> 100
          </span>
        </button>
        <button className="btn btn-primary p-1" onClick={() => handleDecrement(10)}>
          <span className="flex items-center justify-center">
            <HiMinus size={12} /> 10
          </span>
        </button>
        <button className="btn btn-primary p-1" onClick={() => handleDecrement(1)}>
          <span className="flex items-center justify-center">
            <HiMinus size={12} /> 1
          </span>
        </button>
      </div>
      <div>
        <input
          ref={ref}
          name="qty"
          type="number"
          step={1}
          min={min}
          max={max}
          className="text-center"
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button className="btn btn-primary p-1" onClick={() => handleIncrement(1)}>
          <span className="flex items-center justify-center">
            <HiPlus size={12} /> 1
          </span>
        </button>
        <button className="btn btn-primary p-1" onClick={() => handleIncrement(10)}>
          <span className="flex items-center justify-center">
            <HiPlus size={12} /> 10
          </span>
        </button>
        <button className="btn btn-primary p-1" onClick={() => handleIncrement(100)}>
          <span className="flex items-center justify-center">
            <HiPlus size={12} /> 100
          </span>
        </button>
      </div>
    </div>
  )
}

const GoodsPurchasePrice = ({ marketplace }: { marketplace: Marketplace }) => {
  const { control } = useFormContext<PurchaseGoodsFormState>()
  const qty = useWatch({ control, name: 'qty' })

  return (
    <div className="flex items-center justify-center gap-2">
      <HiOutlineCash size={20} className="text-emerald-400" />
      <span className="font-bold">{formatNumber(marketplace.pricePerUnit * Number(qty))}</span>
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
          <div className="grid grid-flow-row gap-4 p-4">
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
            <div className="text-center">{marketplace && <GoodsPurchasePrice marketplace={marketplace} />}</div>
          </div>
          <div className="border-t border-gray-900">
            <div className="grid grid-flow-col gap-2 rounded-b-lg bg-gray-900 p-2">
              <button className="btn btn-confirm" type="submit" disabled={!marketplace}>
                CONFIRM
              </button>
              <button onClick={onCancel} className="btn bg-gray-800 ring-rose-500">
                CANCEL
              </button>
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
