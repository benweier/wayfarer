import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'
import tw from 'twin.macro'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return <div css={tw`h-screen max-w-lg mx-auto py-16 grid items-center`}>{children}</div>
}
