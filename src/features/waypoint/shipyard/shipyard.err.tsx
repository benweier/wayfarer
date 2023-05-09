import { ErrorComponentProps } from '@/components/error-boundary'
import { isHttpError } from '@/services/http'

export const Err = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isHttpError(error)) {
    return (
      <div className="rounded border-2 border-transparent px-3 py-9">
        <div className="text-secondary text-center text-xl font-bold">{error.message}</div>
      </div>
    )
  }

  return <></>
}
