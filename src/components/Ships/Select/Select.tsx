import { useCallback, useState } from 'react'
import tw from 'twin.macro'
import { Select } from '@/components/Select'
import { YourShip } from '@/types/spacetraders'

const getShipItemKey = (ship?: YourShip) => ship?.id
const getShipOption = (ship: YourShip) => ({
  id: ship.id,
  name: (
    <div css={tw`grid gap-4 grid-cols-3 items-center`}>
      <div>
        {ship.manufacturer} {ship.class}
      </div>
      <div css={tw`text-xs`}>
        <span>{ship.cargo.reduce((cargo, { totalVolume = 0 }) => cargo + totalVolume, 0)}</span>
        <span> / </span>
        <span>{ship.maxCargo}</span>
      </div>
      <div css={tw`text-xs text-gray-400`}>ID: {ship.id}</div>
    </div>
  ),
})

export const ShipSelect = ({ ships, onChange }: { ships: YourShip[]; onChange: (ship?: YourShip) => void }) => {
  const [selected, setSelected] = useState<YourShip | undefined>()

  const handleChange = useCallback(
    (value?: YourShip) => {
      onChange(value)
      setSelected(value)
    },
    [onChange],
  )

  return (
    <Select
      label="Ships"
      data={ships}
      selected={selected}
      onChange={handleChange}
      getItemKey={getShipItemKey}
      getOption={getShipOption}
    />
  )
}
