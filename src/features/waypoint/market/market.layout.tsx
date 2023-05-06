import { ReactNode } from 'react'

export const Layout = ({
  imports,
  exports,
  exchange,
}: {
  imports: ReactNode
  exports: ReactNode
  exchange: ReactNode
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Imports</div>
        {imports}
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Exports</div>
        {exports}
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Exchange</div>
        {exchange}
      </div>
    </div>
  )
}
