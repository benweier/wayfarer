import Auth from '../components/Auth'
import { Meta } from '../components/Meta'
import { AuthLayout } from '../layouts/Auth'

export const AuthPage = () => {
  return (
    <>
      <Meta title="Authenticate" />
      <AuthLayout>
        <Auth />
      </AuthLayout>
    </>
  )
}
