import { AvailableShips } from '@/components/Ships/Available'
import { OwnedShips } from '@/components/Ships/Owned'

export const Ships = () => {
  return (
    <div className="grid gap-10">
      <OwnedShips />
      <AvailableShips />
    </div>
  )
}
