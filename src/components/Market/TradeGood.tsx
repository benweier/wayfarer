export const TradeGood = ({ price, volume, supply }: { price: number; volume: number; supply: string }) => {
  return (
    <div className="flex items-center gap-12">
      <div>
        <div className="text-secondary text-xs">UNIT PRICE</div>
        {new Intl.NumberFormat('en-US').format(price)}
      </div>

      <div>
        <div className="text-secondary text-xs">UNITS AVAILABLE</div>
        {new Intl.NumberFormat('en-US').format(volume)}
      </div>

      <div>
        <div className="text-secondary text-xs">SUPPLY</div>
        {supply}
      </div>
    </div>
  )
}
