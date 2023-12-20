import { Loading } from '@/components/loading'
import { WaypointMarketLayout } from './waypoint-market.layout'

export const WaypointMarketFallback = () => {
  return (
    <WaypointMarketLayout
      imports={
        <>
          <Loading />
          <Loading />
        </>
      }
      exports={
        <>
          <Loading />
          <Loading />
        </>
      }
      exchange={
        <>
          <Loading />
          <Loading />
        </>
      }
    />
  )
}
