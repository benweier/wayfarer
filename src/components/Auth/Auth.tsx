import { Routes, Route } from 'react-router'
import tw from 'twin.macro'
import { Login } from './Login'
import { Register } from './Register'

export const Auth = () => {
  return (
    <div css={tw`rounded-lg border-2 border-gray-600 px-4 py-6`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
