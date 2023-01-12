import { useCallback, useLayoutEffect, useRef } from 'react'

const isiOS = () => {
  return navigator.userAgent.includes('Mac') && 'ontouchend' in document
}

export const useScrollLock = () => {
  const scrollOffset = useRef(0)

  const activate = useCallback(() => {
    document.body.dataset.scrollLock = 'true'
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = 'var(--scrollbar-compensation)'

    if (isiOS()) {
      scrollOffset.current = window.pageYOffset
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollOffset.current}px`
      document.body.style.width = '100%'
    }
  }, [])

  const deactivate = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    if (isiOS()) {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollOffset.current)
    }

    document.body.dataset.scrollLock = 'false'
  }, [])

  useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
    document.body.style.setProperty('--scrollbar-compensation', `${scrollBarCompensation}px`)
  }, [])

  return {
    activate,
    deactivate,
  }
}
