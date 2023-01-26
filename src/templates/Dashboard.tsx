import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export const DashboardTemplate = ({ children }: WithChildren) => {
  return (
    <div className="relative">
      <Header />
      <div className="container py-4">{children}</div>
      <Footer />
    </div>
  )
}
