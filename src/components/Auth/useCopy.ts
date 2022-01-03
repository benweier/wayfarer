import { useState, useRef, useEffect, useCallback } from 'react'

export const useCopy = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const onCopy = useCallback(
    async (value: string) => {
      return await navigator.clipboard.writeText(value).then(() => {
        setIsCopied(true)
      })
    },
    [setIsCopied],
  )
  const reset = useCallback(() => {
    setIsCopied(false)
  }, [setIsCopied])

  useEffect(() => {
    const node = ref.current
    const copyHandler = () => {
      setIsCopied(true)
    }

    node?.addEventListener('copy', copyHandler)

    return () => {
      node?.removeEventListener('copy', copyHandler)
    }
  }, [])

  return { ref, isCopied, onCopy, reset }
}
