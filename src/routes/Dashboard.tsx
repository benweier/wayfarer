import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Outlet } from 'react-router-dom'
import tw, { theme } from 'twin.macro'
import { Grid } from '@/components/Grid'
import { DashboardTemplate } from '@/templates/Dashboard'

export const DashboardPage = () => {
  return (
    <DashboardTemplate>
      <Suspense
        fallback={
          <Grid justify="center" align="center" css={tw`animate-pulse`}>
            <GiNorthStarShuriken size={96} color={theme`colors.gray.700`} />
          </Grid>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardTemplate>
  )
}
