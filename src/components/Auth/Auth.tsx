import { Routes, Route } from 'react-router-dom'
import tw from 'twin.macro'
import { Login } from './Login'
import { Register } from './Register'

export const Auth = () => {
  return (
    <div css={tw`rounded-lg border border-gray-700 shadow-xl px-8 py-8`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
