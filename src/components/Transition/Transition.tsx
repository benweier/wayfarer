import { FC } from 'react'
import { UseTransitionProps, useTransition } from '@react-spring/web'
import { Animated } from '@/components/Animated'
import { Location, useLocation } from '@/hooks/useLocation'

export const Transition: FC = ({ children }) => {
  const location = useLocation<{ transition: UseTransitionProps<Location> }>()

  const transitions = useTransition(
    location,
    location.state?.transition ?? {
      exitBeforeEnter: true,
      config: { duration: 85 },
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    },
  )

  return (
    <>
      {transitions((style, loc) => (
        <Animated key={loc.pathname} style={style}>
          {children}
        </Animated>
      ))}
    </>
  )
}
