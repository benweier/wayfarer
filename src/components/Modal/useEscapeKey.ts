import { useEffect } from 'react'

const ESCAPE_KEY = 'Escape'

export const useEscapeKey = (callback: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) {
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [callback])
}
