import { FC } from 'react'
import { useTransition } from '@react-spring/web'
import { Animated } from '@/components/Animated'
import { useLocation } from '@/hooks/useLocation'

export const Transition: FC = ({ children }) => {
  const location = useLocation()

  const transitions = useTransition(location, {
    keys: location.pathname,
    exitBeforeEnter: true,
    config: { duration: 100 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      {transitions((style, location) => (
        <Animated key={location.pathname} style={style}>
          {children}
        </Animated>
      ))}
    </>
  )
}
