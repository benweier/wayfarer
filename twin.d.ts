import 'twin.macro'
import styledImport, { CSSProp, css as cssImport } from 'styled-components'

declare module 'twin.macro' {
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }

  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
  }

  function forwardRef<T, P = Record<string, never>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string | Element
    }
  }
}
