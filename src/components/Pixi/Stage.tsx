import { Stage as PixiStage } from '@inlet/react-pixi'
import { ComponentProps, FC, ReactNode } from 'react'
import { ReactReduxContext } from 'react-redux'

const ContextBridge: FC<{ Context: typeof ReactReduxContext; render: (children: ReactNode) => ReactNode }> = ({
  children,
  Context,
  render,
}) => {
  return (
    <Context.Consumer>
      {(value) => render(<Context.Provider value={value}>{children}</Context.Provider>)}
    </Context.Consumer>
  )
}

export const Stage: FC<ComponentProps<typeof PixiStage>> = ({ children, ...props }) => {
  return (
    <ContextBridge Context={ReactReduxContext} render={(children) => <PixiStage {...props}>{children}</PixiStage>}>
      {children}
    </ContextBridge>
  )
}
