import { useEffect, useRef, useState, useTransition } from 'react'
import { flushSync } from 'react-dom'

type Values<T> = T[keyof T]

export const TransitionStage = {
  appear: 'appear',
  entering: 'entering',
  entered: 'entered',
  exiting: 'exiting',
  exited: 'exited',
} as const

export function useInOutTransition(value: boolean, duration: number) {
  const [stage, setStage] = useState<Values<typeof TransitionStage>>(() => {
    return value ? TransitionStage.appear : TransitionStage.exited
  })
  const [, startTransition] = useTransition()
  const isInitialRun = useRef(true)
  const durationRef = useRef(duration)

  durationRef.current = duration

  useEffect(() => {
    if (isInitialRun.current) {
      isInitialRun.current = false
      return () => {
        // noop
      }
    }

    if (value && stage === TransitionStage.exited) {
      queueMicrotask(() => {
        startTransition(() => {
          flushSync(() => {
            setStage(TransitionStage.appear)
          })
        })
      })
    }

    queueMicrotask(() => {
      startTransition(() => {
        const next = value ? TransitionStage.entering : TransitionStage.exiting
        setStage(next)
      })
    })

    const final = setTimeout(() => {
      startTransition(() => {
        const next = value ? TransitionStage.entered : TransitionStage.exited
        setStage(next)
      })
    }, durationRef.current)

    return () => {
      if (final) clearTimeout(final)
    }
  }, [stage, value])

  return { stage }
}
