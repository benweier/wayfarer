import { useCallback, useState } from 'react'
import { Select } from '@/components/Select'
import { YourShip } from '@/types/spacetraders'

const getShipItemKey = (ship?: YourShip) => ship?.id
const getShipOption = (ship: YourShip) => ({
  id: ship.id,
  name: (
    <div className="grid grid-cols-3 items-center gap-4">
      <div>
        {ship.manufacturer} {ship.class}
      </div>
      <div className="text-xs">
        <span>{ship.cargo.reduce((cargo, { totalVolume = 0 }) => cargo + totalVolume, 0)}</span>
        <span> / </span>
        <span>{ship.maxCargo}</span>
      </div>
      <div className="text-xs text-gray-400">ID: {ship.id}</div>
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
