import 'react'

declare global {
  type WithChildren<T = Record<string, unknown>> = React.PropsWithChildren<T>

  type WithClassName<T = Record<string, unknown>> = T & {
    className?: string
  }
}

declare module 'react' {
  function forwardRef<T, P = Record<string, never>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}
