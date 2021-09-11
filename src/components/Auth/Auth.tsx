import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'
import { Login } from './Login'
import { Register } from './Register'

export const Auth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div css={tw`rounded-lg border-2 border-gray-600 px-4 py-6`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
